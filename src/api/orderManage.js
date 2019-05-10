import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/order/ordersByCondition',
        method: 'post',
        data: params
    })
}

export function getCusInsureDetails(params) {
    return request({
        url: '/order/orderList',
        method: 'get',
        params: params
    })
}
