const { verify } = require('jsonwebtoken') // 获得生成token的方法
const { SECRET, TIME } = require('../config/constant');
// Token验证
function vertyfyTOken(token, url) {
  let data = {
    next: false, // false 不能通关，true允许通关
    userId: '',
    body: {
      code: 200,
      data: null,
      token: token,
      msg: ''
    }
  }
  let tokenObj = null, iserror = false

  try {
    tokenObj = verify(token, SECRET)// phone, password,iat,exp
  } catch (error) {
    iserror = true
  }

  try {
    'userId' in tokenObj
  } catch (error) {
    iserror = true
  }

  if (PathVertify(url)) {
    data.next = true
    data.body.token = null
    if (!iserror) {
      data.userId = tokenObj.userId
    }
    return data
  }

  if (!token || (typeof token == 'string' && !token.length) || iserror) { // 是否有token、token是否为空
    data.body.msg = '未登录'
    data.body.code = 401
    data.body.token = null
    data.next = false
    return data
  }
   
  if (tokenObj.exp - tokenObj.iat > 86400000) {
    data.body.msg = '登录超时'
    data.body.code = 402
    data.body.token = null
    data.next = false
    return data
  }
  data.userId = tokenObj.userId
  data.next = true
  return data
}

// 路由白名单（不被路由验证token）
function PathVertify(url) {
  let path = [
    '/api/users/Login',
    '/api/users/Register',
    '/api/upload/image',
    '/api/upload/video',
    '/api/upload/avatar',
    '/public',
    '/img',
    '/api/users/sendCodeByPone',
    '/api/tags/Tags'
  ]
  for (let item of path) {
    console.log(item, url);
    if (url.includes(item)) {
      return true
    }
  }
  return false
}


// 路由白名单
module.exports = vertyfyTOken