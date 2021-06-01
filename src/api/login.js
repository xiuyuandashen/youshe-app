import request from "@/utils/request.js"

export default {
    getCaptcha(){

        return request({
            url:"/user/captcha",
            method:"get"
        })
    },
    login(userInfo){
        return request({
            url:"/user/login",
            method:"post",
            data: userInfo
        })
    },
    getRefreshToken(token){

        return request({
            url:'/user/RefreshToken',
            method:'get',
            params:{
                token
            }
        })
    }
}