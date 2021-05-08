import axios from 'axios'
import {Toast} from 'vant'

const service = axios.create({
    baseURL: 'http://localhost:8001',
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
        Toast.fail('异常');  
        // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //   MessageBox.confirm(
        //     '你已被登出，可以取消继续留在该页面，或者重新登录',
        //     '确定登出',
        //     {
        //       confirmButtonText: '重新登录',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }
        //   ).then(() => {
        //     store.dispatch('FedLogOut').then(() => {
        //       location.reload() // 为了重新实例化vue-router对象 避免bug
        //     })
        //   })
        // }
        return Promise.reject('error')
      } else {
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

