<template>
  <div class="app-container">
      <van-panel v-for="item,index in repairsVos" :key="index" >
          <template #header>
              <div class="panel-header">
                  <div>
                       <svg-icon :icon-class="item.isComplete==1?'success':'unfinished'" style="margin:0 5px 0 5px"></svg-icon>
                        <span>报修内容：{{item.content}}</span>
                  </div>
                    
              </div>
          </template>
          <template #default>
              <div style="padding: 10px;margin-left:5px" class="panel-content">
                  
                  <span style="color:rgb(127 127 129);font-size:15px">地点：{{item.roomNumber}}</span> 
                   
                      <span style="color:#c8c9cc;font-size:12px">{{item.gmtModified}}</span>
                    
              </div>
          </template>
      </van-panel>
  </div>
</template>

<script>

import repairs from '@/api/repairs/repairs'
export default {
    data(){
        return {
            repairsVos:[
                
            ],
            page:1,
            size:5,
            total:0,
            userId:0
        }

    },
    created(){
        this.userId = JSON.parse(localStorage.getItem("user")).id
        this.getRepairsList()
    },
    computed:{
        user(){
            return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):this.$store.state.user
        }
    },
    methods:{
        getRepairsList(){
            // console.log(this.userId + " " + this.page + " " + this.size)
            repairs.getRepairsByUser(this.userId,this.page,this.size).then(res=>{
                // console.log(res)
                this.repairsVos = res.data.repairsVos
                this.total = res.data.total
                // console.log(this.repairsVos)
            })
        }
    }
}
</script>

<style>
    .panel-header{
        display: flex;
        /* align-items: center; */
        padding: 10px;
        justify-content: start;
        /* height: 40px; */
    }
    .panel-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>