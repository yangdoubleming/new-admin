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

export function getInsuranceInformation(params) {
    return request({
        url: `/order/getInsuranceInformation`,
        method: 'post',
        data: params
    })
}

export function addOrder(params) {
    return request({
        url: `/order/addOrderApi`,
        method: 'post',
        data: params
    })
}

export function getBalance(params) {
    return request({
        url: `/company/getBalance`,
        method: 'post',
        data: params
    })
}

export function accountInfo(params) {
    return request({
        url: `/account/info`,
        method: 'post',
        data: params
    })
}

export function goPay(data) {
    return request({
        url: `/order/updateOrderById/${data.ticketNo}/${data.source}`,
        method: 'get'
    })
}