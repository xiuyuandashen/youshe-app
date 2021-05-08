import request from "@/utils/request.js"

export default {
    
    findAnnouncement(page,size){
        return request({
            url:`/mcp/announcement/findAnnouncement/${page}/${size}`,
            method:"get"
        })
    },
    selectById(id){
        return request({
            url:`/mcp/announcement/${id}`,
            method:"get"
        })
    }
}