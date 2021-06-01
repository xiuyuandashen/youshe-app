import axios from 'axios'
import {Toast} from 'vant'
import login from '@/api/login'
import store from '../store';


window.isReresh = false;//用于判断是否刷新，不能少 防止陷入不限响应死循环

const service = axios.create({
    baseURL: 'http://localhost:8002',
    timeout: 3000,
});

service.interceptors.request.use(config=>{
  config.headers['Authorization'] = localStorage.getItem("token") // 请求头带上token   
  return config
})

// response 拦截器
service.interceptors.response.use(
    response => {
      /**
       * code为非20000是抛错 可结合自己业务进行修改
       */
       

      const res = response.data
      if (res.code !== 20000) {
        console.log(res)
        Toast.fail(res.message);
        if(res.message=="token过期或未登录！"){
          store.commit("SET_ISLOGIN",false);
          router.push("/login")
        }
        
        return Promise.reject('error')
      } else {
        // console.log("isLogin: ",store.state.isLogin)
        if(store.state.isLogin){
            if(!window.isReresh){
              window.isReresh = true;
              login.getRefreshToken(localStorage.getItem("token"))
            .then(res=>{
                //localStorage.setItem('token',res.data.token) ;
                // console.log("刷新token：",res.data.token);
                store.commit("SET_TOKEN",res.data.token);
                window.isReresh = false;
            })
          }
        }
         
        return response.data
      }
    },
    error => {
    //   console.log('err' + error) // for debug
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
      return Promise.reject(error)
    }
    
  )


export default service 

