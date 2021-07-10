<template>
  <div class="app-container">
      <van-nav-bar
        title="家"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
       
        >
        
      </van-nav-bar>
        <transition name="van-fade">
            <router-view></router-view>
        </transition>
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