<template>
  <div>
      <van-panel :title="announcement.title" :desc="announcement.gmtModified+' '+announcement.authorName" >
          
            <div style="padding:20px">{{announcement.content}}</div>
            
        </van-panel>
    </div>
</template>

<script>
import announcementApi from '@/api/announcement/announcement'
export default {
      
    data(){
        return {
            announcement:{
                content:""
            }
        }
    },
    created(){
        let id = this.$route.params.id;
        this.getById(id);
    },
    methods:{
        getById(id){
            announcementApi.selectById(id).then(response=>{
                //console.log(response)
                this.announcement = response.data.announcementVo;
                //console.log(this.announcement)
            })
        }
    }
}
</script>

<style>

</style>