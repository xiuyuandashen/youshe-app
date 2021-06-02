<template>
<div class="app-container">
<van-row type="flex" justify="space-around" align="center" style="background-color:white;">
      <van-col span="2" style="text-align:center;"><van-icon name="wap-nav" style="font-size:30px" /></van-col> 
      <van-col offset="" span="18"> <van-search v-model="value" placeholder="请输入搜索关键词" /></van-col>
    </van-row>
    
    <!-- 轮播图 -->
    <van-swipe  :autoplay="3000" style="height:15vh" >
        <van-swipe-item v-for="(image,index) in images" :key="index" style="text-align: center;">
            <img  :src="image" style="height: 100%;width: auto;"  />
        </van-swipe-item>
    </van-swipe>
    <div class="call-item">
        <van-grid square>
        
            <van-grid-item v-for="(value,index) in values" :key="index"   :text="value.title" :to="value.path">
            
                <!-- <span style="font-size:13px">{{value.title}}</span> -->
                <template #icon>
                    <svg-icon :icon-class="value.icon" style="font-size:24px;margin-bottom:7px"/>
                </template>
                <!-- <template #text>
                    <span style="color:red">{{value.title}}</span>
                </template> -->
            </van-grid-item>
        
        
        </van-grid>
    </div>
    
    <div class="call-item" style="padding: 2px 10px 0 10px;">
        <h4 >广告</h4>
        <img v-for="(img,index) in imageList" v-lazy="img" :key="index" style="width: 100%;height:auto;padding-bottom:10px" />
    </div>
    
    
       
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
            values: [
                {
                    title:"报修管理",
                    path:"/repairs/list",
                    icon:"repairs"
                    
                },
                {
                    title:"我的家",
                    path:"",
                    icon:"home"
                },{
                    title:"健康打卡",
                    path:"/healthCard/table",
                    icon:"card"
                }
            ],
            value:"",
            imageList: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
        }
    }
}
</script>

<style>
    .call-item{
        margin: 10px;
        background-color: white;
        /* border-radius: 30%; */
    }
    .app-container{
        background-color: #f7f8fa;
        /* min-height: calc( 100vw - 54px ); */
    }
</style>