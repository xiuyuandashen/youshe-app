import request from '@/utils/request'

export default {
    getLastTimeCard(userId){
        return request({
            url:`/mcp/health-card/lastTimeCard/${userId}`,
            method:'get'
        })
    },
    saveCard(healthCard,userId){
        return request({
            url:`/mcp/health-card/save/${userId}`,
            method:'post',
            data: healthCard
        })
    }
}