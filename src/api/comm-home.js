import req from '../fetch/index.js'

const config = {
  listSlideshow: {
    url: '/app/home/listSlideshow',
    method: 'post'
  },
  listHotGood: {
    url: '/app/home/listHotGood',
    method: 'post'
  },
  // 获取店铺邀请码
  selecteCustomer: {
    url: '/app/user/selecteCustomer',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
