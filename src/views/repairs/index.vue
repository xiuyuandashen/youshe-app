<template>
  <div class="app-container">
      <van-nav-bar
        title="报修"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        right-text="添加"
        @click-right="onClickRight"
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
        },
        onClickRight(){
            console.log("报修")
            this.$router.push("/repairs/table")
        }
    }
}
</script>

<style>

</style>