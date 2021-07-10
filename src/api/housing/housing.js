import request from '@/utils/request'

export default {
    
    getHousingVosByUserId(userId){
        return request({
            url:`/mcp/housing/findByUserId/${userId}`,
            method:'get'
        })
    },
    
}