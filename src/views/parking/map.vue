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
          that.map = new AMap.Map('container',{
              resizeEnable: true,
               center: [118.47928, 25.03379],
              zoom: 13
          })
          console.log("map : ",that.map)
          //实时路况图层
          let trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10
          });
          that.map.add(trafficLayer);//添加图层到地图
          that.positioning()
        }).catch(e=>{
          console.log("地图加载失败")
        })
      },
      positioning(){
        let that = this
        this.map.plugin("AMap.Geolocation",()=>{
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            that.map.addControl(geolocation);
            geolocation.getCurrentPosition((status,result)=>{
              if(status == "complete"){
                console.log("status: ",status);
                console.log(result.position) // 定位结果
                console.log("经度:",result.position.getLng())
                console.log("纬度：",result.position.getLat())
                // that.map.center = [result.position.getLng(),result.position.getLat()]
              }else{
                console.log("定位失败")
              }
            });
             AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            
             AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        })
      }
    }
}
</script>

<style>

</style>