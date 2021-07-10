<template>
  <div class="app-1">
      <div class="home-item" v-for="item,index in housingVos" :key="index">
          <div>
              <span>楼房号：{{item.buildName}}</span>
          </div>
          <div>
              <span>单元号：{{item.roomNumber}}</span>  
          </div>
      </div>
  </div>
</template>

<script>
import housing from '@/api/housing/housing'
export default {
    data(){
        return {
            userId:'',
            housingVos:[]
        }
    },
    created(){
        this.userId = JSON.parse(localStorage.getItem("user")).id
        this.getHousingVos()
    },
    methods:{
        getHousingVos(){
            housing.getHousingVosByUserId(this.userId)
            .then(res=>{
                console.log(res)
                this.housingVos = res.data.housingVos
            })
        }
    }
}
</script>

<style>
    .home-item{
        margin: 0px 10px 10px 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 5px;
        background: white;
        height: 80px;
        border-radius: 20px;
    }
    .app-1{
        background-color: #f7f8fa;
        height:calc( 100vh - 46px ) ;
        max-height: calc( 100vh - 46px );
        padding-top: 10px;
    }
</style>