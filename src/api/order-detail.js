import req from '../fetch/index.js'

const config = {
  selectOrder: {
    url: '/app/order/selectOrder',
    method: 'post'
  },
  selectShopOrder: {
    url: '/app/store/selectOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
