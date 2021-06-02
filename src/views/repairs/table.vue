<template>
  <div>
      <van-form @submit="onSubmit">
        <van-field
        v-model="repairs.content"
        rows="3"
        autosize
        label="报修内容"
        type="textarea"
        :maxlength="maxlength"
        placeholder="请输入报修内容"
        show-word-limit
        />

        <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="选择房屋"
            placeholder="点击选择房屋"
            @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="housings"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            >
            
            </van-picker>
        </van-popup>

        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import {Toast} from 'vant'
import housing from '@/api/housing/housing'
import repairs from '@/api/repairs/repairs'
export default {
    data(){
        return {
            repairs:{},
            maxlength:50,
            housings:[
                    
            ],
            value:"",
            message:"",
            showPicker:false,
            userId:'',
            housingVo:[],
            addressId:''
        }
    },
    created(){
        this.userId = JSON.parse(localStorage.getItem("user")).id
        this.getHousingVosByUserId()
    },
    methods:{
        onSubmit(){
            this.save()
        }, 
        onConfirm(value, index) {
            Toast(`当前值：${value}`);
            this.showPicker = false
            this.value = value
            this.addressId = this.housingVo.filter(e=>e.roomNumber==this.value).map(e=>e.id)[0]
            console.log(this.addressId)
        },
        onChange(picker, value, index) {
            Toast(`当前值：${value}`);
        },
        onCancel() {
            Toast('取消');
        },
        getHousingVosByUserId(){
            housing.getHousingVosByUserId(this.userId).then(res=>{
                // console.log(res)
                this.housingVo = res.data.housingVos
                console.log(this.housingVo)
                this.housings = this.housingVo.map(e=>e.roomNumber)
            })
        },
        save(){
            repairs.save(this.userId,this.addressId,this.repairs)
            .then(res=>{
                // console.log(res)
                this.$router.go(-1)
            })
        }
    }
}
</script>

<style>

</style>