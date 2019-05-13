import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index')
        }]
    },
    // { path: '*', redirect: '/404', hidden: true },

    // 订单管理
    {
        path: '/orderManage',
        component: Layout,
        children: [
            {
                path: 'customerInsure',
                name: 'customerInsure',
                component: () => import('@/views/orderManage/customerInsure'),
                meta: { title: '我的保单'}
            },
            {
                path: 'customerInsureDetails',
                name: 'customerInsureDetails',
                component: () => import('@/views/orderManage/customerInsureDetails'),
                meta: { title: '保单详情' }
            },
            {
                path: 'customerInsureAdd',
                name: 'customerInsureAdd',
                component: () => import('@/views/orderManage/customerInsureAdd'),
                meta: { title: '新增保单' }
            },
            {
                path: 'amazonAgree',
                name: 'amazonAgree',
                component: () => import('@/views/orderManage/amazonAgree'),
                meta: { title: '亚马逊授权投保' }
            }
        ]
    },

    // 账户中心
    {
        path: '/accountCenter',
        component: Layout,
        children: [
            {
                path: 'recharge',
                name: 'recharge',
                component: () => import('@/views/accountCenter/recharge'),
                meta: { title: '账户信息'}
            }
        ]
    },

];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
