import req from '../fetch/index.js'

const config = {
  getShopData: {
    url: '/app/shopCart/listShopCart',
    method: 'post'
  },
  addOrder: {
    url: '/app/order/saveOrder',
    method: 'post'
  },
  deleteShopCar: {
    url: '/app/shopCart/deleteShopCart',
    method: 'post'
  },
  editShopCar: {
    url: '/app/shopCart/stateShopCart',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
