import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/order/ordersByCondition',
        method: 'post',
        data: params
    })
}
