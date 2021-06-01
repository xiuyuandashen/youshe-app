<template>
  <div id="container" style="height:85vh">
      
  </div>
</template>

<script>

import MapLoader from '@/assets/js/AMap.js'

export default {
    data(){
        return {
            map : null
        }
    },
    created(){
      this.loadMap()
      
    },
    methods:{
      loadMap(){
        let that = this 
        MapLoader().then(res=>{
              let position = new AMap.LngLat(118.47928, 25.03379)
              that.map = new AMap.Map('container',{
                  resizeEnable: true,
                  center: position,

                  zooms: [4,18],
                  zoom: 18,
                  zoomEnable:true
              })
              console.log("map : ",that.map)
              //实时路况图层
              let trafficLayer = new AMap.TileLayer.Traffic({
                zIndex: 10
              });
              that.map.add(trafficLayer);//添加图层到地图
              

              let marker = new AMap.Marker({
                      position: new AMap.LngLat(118.480924, 25.03415),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                      title: '4栋',
                      icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
                      content: '<h3>4栋205</h3>'
                    });
              that.map.add(marker)
              // 信息窗体
              var infoWindow = new AMap.InfoWindow({
                    anchor: 'top-center',
                    content: '这是4栋',
            });
              // infoWindow.open(that.map,[118.480924, 25.03415])
              // that.positioning()

              that.map.on('click',(ev)=>{
                // 触发事件的对象
                let target = ev.target;
                // 触发事件的地理坐标，AMap.LngLat 类型
                let lnglat = ev.lnglat;
                console.log(lnglat)
                // 打开 信息窗体
                infoWindow.open(that.map,[118.480924, 25.03415])
              })

              // 使用鼠标左键画多边形 右键结束
              that.map.plugin(["AMap.MouseTool"],function(){ 
                //在地图中添加MouseTool插件
                  var mouseTool = new AMap.MouseTool(that.map);

                  //用鼠标工具画多边形
                  var drawPolygon = mouseTool.polygon(); 

                  //添加事件
                  AMap.event.addListener( mouseTool,'draw',function(e){
                      console.log(e.obj.getPath());//获取路径/范围
                  // 可以将绘制的路径 保存至数据库
              });

              // 根据path 在地图上画出框
              var path = [
                new AMap.LngLat(118.480503,25.034295),
                new AMap.LngLat(118.480492,25.033741),
                new AMap.LngLat(118.4812,25.033771),
                new AMap.LngLat(118.481227,25.034295),
                new AMap.LngLat(118.480503,25.034295)
              ];
              var polyline = new AMap.Polyline({
                path: path,  
                borderWeight: 2, // 线条宽度，默认为 1
                strokeColor: 'red', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
              });
              that.map.add(polyline);

              // 路线规划
              AMap.plugin('AMap.Driving', function() {
                let driving = new AMap.Driving({
                  // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                  policy: AMap.DrivingPolicy.LEAST_TIME,
                  map: that.map,
                  panel: "panel"
                })
                
                var startLngLat = [118.479554, 25.03326]
                var endLngLat = [118.480924, 25.03415]
                 that.createLeftLine(startLngLat,endLngLat)
                // driving.search(startLngLat, endLngLat, function (status, result) {
                //   // 未出错时，result即是对应的路线规划方案
                    
                //    if (status === 'complete') {
                //       if (result.routes && result.routes.length) {
                //           // 绘制第一条路线，也可以按需求绘制其它几条路线
                //           drawRoute(result.routes[0])
                //       }
                //   } else {
                //       console.log('获取驾车数据失败：' + result)
                //   }
                  
                // })

                // AMap.Event.addListener(driving, "complete", driving_CallBack);
            })

            });




        }).catch(e=>{
          console.log("地图加载失败")
        })
      },
      positioning(){
        let that = this
        // this.map.plugin("AMap.Geolocation",()=>{
        //     let geolocation = new AMap.Geolocation({
        //         enableHighAccuracy: true,//是否使用高精度定位，默认:true
        //         timeout: 1000000,          //超过10秒后停止定位，默认：无穷大
        //         maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        //         convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        //         showButton: true,        //显示定位按钮，默认：true
        //         buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角
        //         buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //         showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        //         showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        //         panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        //         zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                
        //     });
            
        //     geolocation.getCurrentPosition(
        //       (status,result)=>{
        //       if(status == "complete"){
        //         console.log("status: ",status);
        //         console.log(result.position) // 定位结果
        //         console.log("经度:",result.position.getLng())
        //         console.log("纬度：",result.position.getLng())
        //         // let marker = new AMap.Marker({
        //         //   position: new AMap.LngLat(result.position.getLng(), result.position.getLng()),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        //         //   title: 'mk',
        //         //   icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
        //         // });
        //         // that.map.add(marker)
        //         //  this.map.center = [result.position.getLng(),result.position.getLat()]
        //         // this.map.setZoom(18)
        //         var currentZoom = this.map.getZoom(); 
        //         console.log("currentZoom: ",currentZoom)
        //       }else{
        //         console.log("定位失败")
        //       }
        //     }
        //     );

        //     that.map.addControl(geolocation);
        //      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            
        //      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        // })
        },// 绘制路径-左
    createLeftLine(start,end) {
      let that = this;
      // if (that.leftStartMark && that.leftEndMark) {
      //   that.leftStartMark.setMap(null);
      //   that.leftEndMark.setMap(null);
      // }
      //绘制左边初始路径，起点-终点
      console.log("---")
      // path = [];
      // path.push(start);
      // path.push(end);
      // 使用DragRoute插件-构造拖拽导航类
      that.map.plugin("AMap.DragRoute", function() {
        let route = new AMap.DragRoute(that.map, [start,end], AMap.DrivingPolicy.LEAST_FEE,{
          startMarkerOptions:{
            position: start,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '起点',
          },
          endMarkerOptions:{
            position: end,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '终点',
          },
          showTraffic:true
        })
         route.search()
         route.on("complete",(res)=>{
           console.log(res)
          //  console.log( route.getRoute()
         })
      });
    }
  },
}
     

</script>

<style>

</style>