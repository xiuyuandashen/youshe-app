<template>
  <div>
      <van-nav-bar title="停车" left-text="返回" @click-left="onClickLeft"></van-nav-bar>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>