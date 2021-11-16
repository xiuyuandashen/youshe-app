<template>
  <div>
    <van-nav-bar
      title="停车"
      left-text="返回"
      @click-left="onClickLeft"
      right-text="我的停车"
      @click-right="onClickRight"
    ></van-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      let userId = JSON.parse(localStorage.getItem("user")).id;
      //console.log(userId);
      this.$router.push({
        path: `/container/parking/myParking/${userId}`,
      });
    },
  },
};
</script>

<style>
</style>