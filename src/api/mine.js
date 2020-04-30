import req from '../fetch/index.js'

const config = {
  getUserInfo: {
    url: '/app/user/selecteCustomer',
    method: 'post'
  },
  getStoreInfo: {
    url: '/app/user/selectStore',
    method: 'post'
  },
  getDriverInfo: {
    url: '/app/user/selectdriver',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
