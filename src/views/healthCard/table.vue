<template>
  <div>
      <van-form @submit="onSubmit">
            <van-field
                v-model="healthCard.bodyTemperature"
                name="体温"
                label="体温"
                placeholder="请输入今日体温"
                type="text"
                
            />
            <van-field
                v-model="healthCard.currentLocation"
                type="text"
                name="当前所在地"
                label="当前所在地"
                placeholder="比如:福建省泉州市南安市xx小区5栋405室"
                
            />
            <van-field name="radio" label="是否离开本地">
                <template #input>
                    <van-radio-group v-model="healthCard.isLeaveLocal" direction="horizontal">
                    <van-radio name=0>否</van-radio>
                    <van-radio name=1>是</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

           
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">打卡</van-button>
            </div>
    </van-form>
  </div>
</template>

<script>
import healthCard from '@/api/healthCard/healthCard'
import {Toast} from 'vant'
export default {
    data(){
        return {
            healthCard:{},
            userId:''
        }
    },
    created(){
        this.userId = JSON.parse(localStorage.getItem("user")).id
        this.getLastTimeCard()
    },
    methods:{
        onSubmit(){
            // console.log(this.healthCard)
            this.healthCard.isLeaveLocal = parseInt(this.healthCard.isLeaveLocal)
            this.healthCard.bodyTemperature = parseFloat(this.healthCard.bodyTemperature)
            // console.log( typeof this.healthCard.bodyTemperature )
            this.saveCard()
        },
        getLastTimeCard(){
            healthCard.getLastTimeCard(this.userId)
            .then(res=>{
                // console.log("-- ---")
                // console.log(res)
                if(res.data.item){
                    
                    this.healthCard = res.data.item
                    this.healthCard.id = null
                }
            })
        },
        saveCard(){
            healthCard.saveCard(this.healthCard,this.userId)
            .then(res=>{
                // console.log("-- -----")
                // console.log(res)
                Toast('打卡成功！')
                this.$router.push("/container/home")
            })
        }
    }
}
</script>

<style>

</style>