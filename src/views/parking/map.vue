<template>
  <div>
    <div id="map-container" style="height: 90vh"></div>
    <!-- <van-popup
      v-model="showPopup"
      closeable
      style="height: 30%"
      :close-on-click-overlay="false"
    >
    </van-popup> -->
  </div>
</template>

<script>
import MapLoader from "@/assets/js/AMap.js";
import parkingSpaceApi from "@/api/PartingSpace/ParkingSpace";
import { Dialog } from "vant";
export default {
  data() {
    return {
      map: null,
      mapData: [],
      mapDataAll: [],
      limit: 5,
      total: null,
      page: 1,
      loading: true,
      dialogVisible: false,
      parkingSpace: {},
      latitudeAndLongitude: {},
      timer: "",
      updatedialogVisible: false,
      // 打算更新到后端的
      updateParkingSpace: {},
      // 后端查出的
      tempParkingSpace: {},
      currentPosition: { lng: -9999, lat: -999999 },
      showPopup: false,
      oldMarker: null,
      dic: new Array(),
    };
  },
  computed: {
    user() {
      return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : this.$store.state.user;
    },
  },
  async created() {
    //await this.getList(this.page, this.limit);
    await this.getListAll();
    await this.loadMap();
    this.getLocation();
  },
  mounted() {
    // 定时获取定位
    this.timer = setInterval(this.getLocation, 1000);
  },
  methods: {
    loadMap() {
      let that = this;
      MapLoader()
        .then((res) => {
          let position = new AMap.LngLat(118.47928, 25.03379);
          that.map = new AMap.Map("map-container", {
            resizeEnable: true,
            center: position,
            zooms: [4, 18],
            zoom: 18,
            zoomEnable: true,
          });
          //console.log("map : ", that.map);
          //实时路况图层
          let trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10,
          });
          that.map.add(trafficLayer); //添加图层到地图

          // var endIcon = new AMap.Icon({
          //   size: new AMap.Size(25, 34),
          //   image:
          //     "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
          //   imageSize: new AMap.Size(135, 40),
          //   imageOffset: new AMap.Pixel(-95, -3),
          // });

          for (let i = 0; i < that.mapDataAll.length; i++) {
            let str = that.mapDataAll[i].latitudeAndLongitude;

            let marker = new AMap.Marker({
              position: new AMap.LngLat(
                parseFloat(str.substring(0, str.indexOf(","))),
                parseFloat(str.substring(str.indexOf(",") + 1, str.length))
              ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: that.mapDataAll[i].parkingSpaceName,
              //icon: endIcon, // 添加 Icon 图标 URL
              // content: "<h3>4栋205</h3>",
            });
            if (that.mapDataAll[i].isStop == 1) {
              marker.setIcon(
                new AMap.Icon({
                  image:
                    "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
                  size: new AMap.Size(36, 36),
                  imageSize: new AMap.Size(19, 33),
                })
              );
            }

            that.map.add(marker);
            that.dic[marker.getTitle()] = that.mapDataAll[i];
            marker.on("click", (e) => {
              that.Popup(that.dic[marker.getTitle()]);
              //console.log(e);
              //console.log(marker.getTitle());
              console.log(that.dic[marker.getTitle()]);
            });
          }

          // // 信息窗体
          var infoWindow = new AMap.InfoWindow({
            anchor: "top-center",
            content: "这是4栋",
          });
          // infoWindow.open(that.map,[118.480924, 25.03415])
          // that.positioning()

          that.map.on("click", (ev) => {
            // 触发事件的对象
            let target = ev.target;
            // 触发事件的地理坐标，AMap.LngLat 类型
            let lnglat = ev.lnglat;
            console.log(lnglat);
            // 打开 信息窗体
            //infoWindow.open(that.map, lnglat);
            // 纬度
            that.latitudeAndLongitude.lat = lnglat.lat;
            // 经度
            that.latitudeAndLongitude.lng = lnglat.lng;
            that.dialogVisible = true;
          });
          this.getLocation();
        })
        .catch((e) => {
          console.log(e);
          console.log("地图加载失败");
        });
    },
    getList(page, limit) {
      return new Promise((resolve, reject) => {
        parkingSpaceApi.getList(page, this.limit).then((res) => {
          let data = res.data;
          this.mapData = res.data.parkingSpaceList;
          this.total = res.data.total;
          //console.log(this.mapData);
          this.loading = false;
          resolve();
        });
      });
    },
    getListAll() {
      return new Promise((resolve, reject) => {
        parkingSpaceApi.getListAll().then((res) => {
          this.mapDataAll = res.data.parkingSpaceList;
          console.log([this.mapDataAll]);
          resolve();
        });
      });
    },
    // 重新渲染
    async show() {
      this.page = 1;
      //await this.getList(1, this.limit);
      this.mapDataAll = [];
      await this.getListAll();
      await this.loadMap();
    },
    // 弹出层
    Popup(parking) {
      let self = this;
      // 检查该车位是否被停放
      console.log(parking);
      parkingSpaceApi.isStopById(parking.id).then((res) => {
        console.log(res);
        let isStop = res.data.isStop;
        console.log(isStop);
        if (!isStop) {
          // 未被停放执行一下内容
          Dialog.confirm({
            message: "是否预约停放该车位",
          })
            .then(() => {
              // on confirm
              self.updateByParting(parking.id);
              self.show();
            })
            .catch(() => {
              // on cancel
            });
        } else {
          // 未被停放执行一下内容
          Dialog.confirm({
            message: "该车位已被停放",
          })
            .then(() => {
              // on confirm
            })
            .catch(() => {
              // on cancel
            });
        }
      });
    },
    // 更新车位信息 主要是是否预约停车
    updateByParting(id) {
      let parking = {
        id: id,
        isStop: 1,
        userId: this.user.id,
        userName: this.user.name,
      };
      //console.log(parking);
      parkingSpaceApi.update(parking).then((res) => {
        //console.log(res);
      });
    },
    // 获取自身定位信息
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          // document.getElementById('status').innerHTML='定位成功'
          //console.log("222");
          var str = [];
          str.push("定位结果：" + data.position);
          str.push("定位类别：" + data.location_type);
          if (data.accuracy) {
            str.push("精度：" + data.accuracy + " 米");
          } //如为IP精确定位结果则没有精度信息
          str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
          //console.log(str);
          //console.log(str[0].substring(5, str[0].indexOf(",")));
          let p = {
            lng: parseFloat(str[0].substring(5, str[0].indexOf(","))),
            lat: parseFloat(
              str[0].substring(str[0].indexOf(",") + 1, str[0].length)
            ),
          };
          //console.log(p.lng + " " + self.currentPosition.lng);
          //console.log("--- ----1");

          if (
            Math.abs(self.currentPosition.lng - p.lng) > 0.0 ||
            Math.abs(self.currentPosition.lat - p.lat) > 0.0
          ) {
            //
            self.currentPosition.lng = p.lng;
            self.currentPosition.lat = p.lat;

            let marker = new AMap.Marker({
              position: new AMap.LngLat(
                self.currentPosition.lng,
                self.currentPosition.lat
              ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "当前位置",
              icon: "//vdata.amap.com/icons/b18/1/2.png",
              // content: "<h3>4栋205</h3>",
            });
            if (self.oldMarker == null) self.oldMarker = marker;
            console.log("--- ----2");

            self.map.add(marker);
            self.map.remove(oldMarker);
            marker.on(
              "click",
              (data) => {
                console.log("点击了");
                console.log(self.mapDataAll);
              },
              self
            );
            console.log(self.currentPosition);
          }
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用ip定位
          self.getLngLatLocation();
        }
      });
    },

    //解析定位结果
    // onComplete(data, that) {
    //   // document.getElementById('status').innerHTML='定位成功'
    //   var str = [];
    //   str.push("定位结果：" + data.position);
    //   str.push("定位类别：" + data.location_type);
    //   if (data.accuracy) {
    //     str.push("精度：" + data.accuracy + " 米");
    //   } //如为IP精确定位结果则没有精度信息
    //   str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
    //   //console.log(str);
    //   //console.log(str[0].substring(5, str[0].indexOf(",")));
    //   let p = {
    //     lng: parseFloat(str[0].substring(5, str[0].indexOf(","))),
    //     lat: parseFloat(
    //       str[0].substring(str[0].indexOf(",") + 1, str[0].length)
    //     ),
    //   };
    //   //console.log(p);
    //   console.log("--- ----");
    //   if (
    //     Math.abs(that.currentPosition.lng - p.lng) <= Number.EPSILON ||
    //     Math.abs(that.currentPosition.lat - p.lat) <= Number.EPSILON
    //   ) {
    //     that.currentPosition.lng = p.lng;
    //     that.currentPosition.lat = p.lat;
    //     let marker = new AMap.Marker({
    //       position: new AMap.LngLat(
    //         that.currentPosition.lng,
    //         that.currentPosition.lat
    //       ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //       title: "当前位置",
    //       icon: "//vdata.amap.com/icons/b18/1/2.png",
    //       // content: "<h3>4栋205</h3>",
    //     });

    //     that.map.add(marker);

    //     console.log(self.currentPosition);
    //   }

    //   //alert("定位成功" + str);
    //   // document.getElementById('result').innerHTML = str.join('<br>');

    //   //console.log(that.map);
    // },
    //解析定位错误信息
    // onError(data) {
    //   console.log("定位失败");
    //   console.log(data.message);
    //   //alert("定位失败" + data.message);
    //   // document.getElementById('status').innerHTML='定位失败'
    //   // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    // },
    getLngLatLocation() {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            //逆向地理编码
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }
        });
      });
    },
  },
};
</script>

<style>
</style>