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
    
    <div class="call-item2" style="">
        
        <div v-for="item,index in goods" :key="index" class="box">
            <img :src="item.imgUrl" alt="" width="100%" style="">
            <span style="margin-top:10px;padding: 3px;">{{item.title}}</span>
            <span style="color:red;padding: 3px;">￥{{item.price}}</span>
        </div>
    </div>
    
    
       
</div>
  
</template>

<script>
export default {
    data(){
        return {
             images: [
                'https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/6354b79d6ba840e9a916a299e1ef9d43file.png',
                'https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/11/e63ee33e843747a6b127800da37103bffile.png',
            ],
            values: [
                {
                    title:"报修管理",
                    path:"/repairs/list",
                    icon:"repairs"
                    
                },
                {
                    title:"我的家",
                    path:"/housing/list",
                    icon:"home"
                },{
                    title:"健康打卡",
                    path:"/healthCard/table",
                    icon:"card"
                },{
                    title:'更多',
                    path:'',
                    icon:'gengduo'
                }
            ],
            value:"",
            goods: [
                {
                    title:"xiaomi/小米手表运动手环",
                    imgUrl:'https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/11/e63ee33e843747a6b127800da37103bffile.png',
                    price:"999.9"

                },
                {
                    title:"xiaomi/小米手表运动手环",
                    imgUrl:'https://edu-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/03/27/d3421e72ee3543f0951cc42fe3b7727ffile.png',
                    price:"999.9"

                },
                {
                    title:"xiaomi/小米手表运动手环",
                    imgUrl:'https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/ad277ec900364d50862fd7cfbf1d9b6dfile.png',
                    price:"999.9"

                },
                {
                    title:"xiaomi/小米手表运动手环",
                    imgUrl:'https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/f222f639f953479ab68eb510b1387889file.png',
                    price:"999.9"

                },
                {
                    title:"xiaomi/小米手表运动手环",
                    imgUrl:'https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/6354b79d6ba840e9a916a299e1ef9d43file.png',
                    price:"999.9"

                },
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
    .call-item2{
        /* display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around; */
        display: grid;
        grid-template-columns:45% 45%;
        grid-column-gap: 5%;
        margin: 0 10px 0 10px;
        grid-row-gap: 10px;
        justify-content:center;
    }
    .box{
        width:100%;
        display:flex;
        justify-content: center;
        flex-direction: column;
        
        background: white;
       
        border-radius: 10px;
       
        overflow:hidden;
        
        
    }
</style>