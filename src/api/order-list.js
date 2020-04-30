import req from '../fetch/index.js'

const config = {
  getOrderList: {
    url: '/app/order/listOrder',
    method: 'post'
  },
  getShopOrderList: {
    url: '/app/store/listOrder',
    method: 'post'
  },
  changeOrderStatus: {
    url: '/app/order/stateOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
