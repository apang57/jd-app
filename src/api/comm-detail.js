
import req from '../fetch/index.js'

const config = {
  selectGood: {
    url: '/app/goodType/selectGood',
    method: 'post'
  },
  payNow: {
    url: '/app/order/saveOrder',
    method: 'post'
  },
  saveShopCart: {
    url: '/app/shopCart/saveShopCart',
    method: 'post'
  }
  // // 查询商品评价接口
  // listAssess: {
  //   url: '/app/goodType/listAssess',
  //   method: 'post'
  // }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
