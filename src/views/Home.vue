<template>
<div>
<van-row type="flex" justify="space-around" align="center">
      <van-col span="2" style="text-align:center;"><van-icon name="wap-nav" style="font-size:30px" /></van-col> 
      <van-col offset="" span="18"> <van-search v-model="value" placeholder="请输入搜索关键词" /></van-col>
    </van-row>
    
    <!-- 轮播图 -->
    <van-swipe  :autoplay="3000" style="height:15vh" >
        <van-swipe-item v-for="(image,index) in images" :key="index" style="text-align: center;">
            <img  :src="image" style="height: 100%;width: auto;"  />
        </van-swipe-item>
    </van-swipe>

    <van-grid square>
        <van-grid-item v-for="value in values" :key="value" icon="photo-o" text="文字" />
</van-grid>
       
</div>
  
</template>

<script>
export default {
    data(){
        return {
             images: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
            ],
            values: 8,
            value:""
        }
    }
}
</script>

<style>

</style>