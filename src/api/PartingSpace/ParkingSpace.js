import request from '@/utils/request'

export default {
    getList(page, size) {
        return request({
            url: `/mcp/parking-space/list/${page}/${size}`,
            method: "get"
        })
    },
    getListAll() {
        return request({
            url: "/mcp/parking-space/list/all",
            method: "get"
        })
    },
    save(parkingSpace) {
        return request({
            url: "/mcp/parking-space/save",
            method: "post",
            data: parkingSpace
        })
    },
    getById(id) {
        return request({
            url: `/mcp/parking-space/get/${id}`,
            method: 'get'
        })
    },
    findName(name) {
        return request({
            url: `/mcp/parking-space/getName/${name}`,
            method: 'get'
        })
    },
    update(parkingSpace) {
        return request({
            url: "/mcp/parking-space/update",
            method: 'post',
            data: parkingSpace
        })
    },
    /**
     * 解除车位占用
     * @param {*} parkingSpace 
     * @returns 
     */
    releaseOfOccupancy(parkingSpace) {
        return request({
            url: `/mcp/parking-space/update/releaseOfOccupancy`,
            method: "post",
            data: parkingSpace
        })
    },
    deleteById(id) {
        return request({
            url: `/mcp/parking-space/delete/${id}`,
            method: "delete"
        })
    },
    isStopById(id) {
        return request({
            url: `/mcp/parking-space/getStatus/${id}`,
            method: "get"
        })
    },
    getByUserId(userId) {
        return request({
            url: `/mcp/parking-space/getByUserId/${userId}`,
            method: "get"
        })
    }

}