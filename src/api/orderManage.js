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

export function findCompanyBySource(source) {
    return request({
        url: `/order/findCompanyBySource/${source}`,
        method: 'get'
    })
}

export function combinationsByProductId(params) {
    return request({
        url: `/apply/combinationsByProductId`,
        method: 'post',
        data: params
    })
}
