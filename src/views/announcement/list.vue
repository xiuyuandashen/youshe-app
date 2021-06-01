<template>
  <div>
       <!-- link 模式，在右侧显示链接箭头 -->
    <van-loading size="24px" v-show="isLoding" >加载中...</van-loading>
    <div v-show="isShow">
        <van-cell value="" v-for="item,index in list" :key="index" :id="item.id" is-link :to="'/container/announcement/content/'+ item.id" >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
            <span class="custom-title">{{item.title}}</span>
            <van-tag type="danger" style="background-color:#c8c9cc">{{item.gmtModified}}</van-tag>
        </template>
    </van-cell>
    <van-pagination v-if="datas.total >= datas.size" v-model="currentPage" :total-items="datas.total" :items-per-page="pageSize" @change="findAnnouncement"/>
    </div>
    
  </div>
</template>

<script>
import announcementApi from '@/api/announcement/announcement'

export default {
    data(){
        return {
            list: [
            ],
            currentPage:1,
            datas:{
                total:0
            },
            pageSize:5,
            isShow :false,
            isLoding:true
            
        }       
    },
    created(){
        this.findAnnouncement();
    },
    methods:{
        findAnnouncement(){
            announcementApi.findAnnouncement(this.currentPage,this.pageSize).then(response=>{
                // console.log(response.data)
                this.datas = response.data
                this.list =  response.data.announcementVos;
                this.isLoding = false
                this.isShow =true
            })
            
        }
    }
}
</script>

<style>

</style>