import request from '@/utils/request'

export default {
    getRepairsByUser(userId,page,size){
        return request({
            url:`/mcp/repairs/find/${userId}/${page}/${size}`,
            method:'get'
        })
    },
    save(userId,addressId,repairs){
        return request({
            url:`/mcp/repairs/save/${userId}/${addressId}`,
            method:'post',
            data:repairs
        })
    }
}