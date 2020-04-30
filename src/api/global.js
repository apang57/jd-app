import req from '../fetch/index.js'

const config = {
  // 获取角色
  getRole: {
    url: '/app/user/getRole',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
