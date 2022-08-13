import {
  get, post
} from './index'

export default {
  Login: (data: object) => post('/api/users/Login', data), // 登录
  Register: (data: object) => post('/api/users/Register', data), // 登录
  resetPassword: (data: object) => post('/api/users/resetPassword', data), // 修改密码
  sendCodeByPone: (data: object) => post('/api/users/sendCodeByPone', data), // 发送手机验证码

  // 分类
  getClassfy: (params: object) => get('/api/tag/getClassfy', params), // 获取分类

  // 商品
  getCommodityByDiscount: (params: object) => get('/api/commodity/getCommodityByDiscount', params), // 获取折扣商品

}