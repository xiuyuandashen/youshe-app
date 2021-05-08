<template>
  <div class="app-container">
      <van-nav-bar
        title="公告"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        
    <router-view></router-view>

  </div>
</template>
<script>
export default {
    data(){
        return{
            
        }           
        
    },
    created(){
        //console.log("hhhh")
    },
    methods:{
        onClickLeft(){
            //  在浏览器记录中后退一步记录，等同于 history.back()
            this.$router.go(-1)
        },
        

    }

}
</script>

<style>

</style>