import Vue from 'vue'
import Router from 'vue-router'
const GetAllPayOrderList = () => import('@/views/getAllPayOrderList') //获取收款码订单列表
const GetServiceOrderList = () => import('@/views/getServiceOrderList') //获取服务中心代理订单列表
const GetAllAgencyList = () => import('@/views/getAllAgencyList') //获取代理用户列表
const GetAgencyCityPriceList = () => import('@/views/getAgencyCityPriceList') //获取市代类型列表及代理费
const GetAllMerchantList = () => import('@/views/getAllMerchantList') //获取市代类型列表及代理费

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/getAllPayOrderList',
      name: 'getAllPayOrderList',
      component: GetAllPayOrderList
    },
    {
      path: '/getServiceOrderList',
      name: 'getServiceOrderList',
      component: GetServiceOrderList
    },
    {
      path: '/getAllAgencyList',
      name: 'getAllAgencyList',
      component: GetAllAgencyList
    },
    {
      path: '/getAgencyCityPriceList',
      name: 'getAgencyCityPriceList',
      component: GetAgencyCityPriceList
    },
    {
      path: '/getAllMerchantList',
      name: 'getAllMerchantList',
      component: GetAllMerchantList
    },
  ]
})
