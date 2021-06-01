import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({

    state:{
        count:0,
        user:{
            userName:"未登录",
            userId:"nui",
            avatar:"https://img01.yzcdn.cn/vant/cat.jpeg"
        },
        token:"",
        authorities:[],
        isLogin:false
    },
    mutations:{
        increment(state){
            state.count++
        },
        SET_TOKEN(state,token){
            // console.log("--- token")
            state.token = token      
            localStorage.setItem("token", token)
        },
        SET_USER(state,user){
            state.user = user;
            console.log(JSON.stringify(user))
            localStorage.setItem("user", JSON.stringify(user))
        },
        SET_AUTHORITIES(state,authorities){
            state.authorities = authorities;
            console.log("store authorities = ",authorities)
            localStorage.setItem("authorities", JSON.stringify(authorities))
        },
        SET_ISLOGIN(state,islogin){
            state.isLogin = islogin;
            if(!state.isLogin){
                localStorage.removeItem("token")
                state.token = ""
            }
        }
    }
})

export default  store