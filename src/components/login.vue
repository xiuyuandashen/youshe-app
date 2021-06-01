<template>
  <div>
    <van-nav-bar title="用户登录" style="background-color:#07c160"/>
    <van-row type="flex" justify="center" style="margin-top: 5vh">
        <van-col span="1">&nbsp</van-col>
        <van-col span="22" style="text-align: center;"><img src="@/assets/logo.png" style="width:10vh;" alt="login"/></van-col>
        <van-col span="1">&nbsp</van-col>
    </van-row>

    <van-row type="flex" justify="center" class="line" style="margin-top: 5vh">
		<van-col span="3">&nbsp</van-col>
		<van-col span="18">
			<van-cell-group>
				<van-field placeholder="请输入用户名" type="text" v-model="my.name" left-icon="manager"/>
			</van-cell-group>
			<van-cell-group>
				<van-field placeholder="请输入密码"  type="password"  v-model="my.password" left-icon="lock"/>
			</van-cell-group>
            
		</van-col>
		<van-col span="3">&nbsp</van-col>   
	</van-row>
    <van-row>
        <van-col span="3">&nbsp</van-col>
        <van-col span="18">
            <van-field
                v-model="my.captchaCode"
                center
                clearable
                label="验证码"
                placeholder="请输入验证码"
                >
                <template #label>
                    <img :src="my.captchaUrl" alt="验证码" style="height:100%;width:100%" @click="getCaptcha">
                </template>
            </van-field>
        </van-col>
        <van-col span="3">&nbsp</van-col>
    </van-row>
    <van-row type="flex" justify="center" class="btns" style="margin-top: 5vh">
		<van-col span="3">&nbsp</van-col>
		<van-col span="18">
			<van-button class="jumpBtn" type="primary" @click.native="login" size="large">登录</van-button>
		</van-col>
		<van-col span="3">&nbsp</van-col>
	</van-row>

  </div>
</template>

<script>
import loginApi from "@/api/login"
import {Toast} from 'vant'
export default {
    data(){
        return {
            my:{
                captchaKey:"",
                captchaUrl:"data:image/png;base64,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"
            },
            
        }
    },
    created(){
        this.getCaptcha()
    },
    methods:{
        getCaptcha(){
            loginApi.getCaptcha().then((res)=>{
                //console.log(res.data)
                this.my.captchaKey = res.data.captchaKey
                this.my.captchaUrl = res.data.imgUrl
            })
        },
        login(){
            
            if(this.my.name ==undefined || this.my.password==undefined || this.my.captchaCode == undefined){ 
                Toast.fail('请填写表单！');
                return ;
            }
            loginApi.login(this.my).then(res=>{
                //console.log(res.data);
                const jwt = res.data.token

                this.$store.commit("SET_TOKEN",jwt);
                this.$store.commit("SET_AUTHORITIES",res.data.authorities) 
                this.$store.commit("SET_USER",res.data.user)
                this.$store.commit("SET_ISLOGIN",true)
                this.$router.push("/")
            })
        }

    }
}
</script>

<style>

</style>