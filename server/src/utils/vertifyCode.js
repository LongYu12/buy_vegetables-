const md5 = require('md5')
const moment = require('moment')
const Base64 = require('js-base64').Base64;
const request = require('request');
const {
  ACCOUNT_SID, AUTH_TOKEN, Rest_URL, AppID
} = require('../config/sendCode.js')
/**
 * 描述：生成随机数
 * @params
 * @return string 
 */
function randomCode() {
  let res = ''
  for (let i = 0; i < 4; i++) {
    res += Math.round(Math.random() * 9)
  }
  return res
}

/**
 * 描述：发送短信验证码
 * @param phone: String 手机号码
 * @returns code or '' 
 */
function sendCode(phone) {
  return new Promise((resolve, reject) => {
    let code = randomCode() // 用户接收的验证码
    // URL字段拼接
    /**
     * md5加密:(账户id（ACCOUNT_SID）+ 账户授权令牌（AUTH_TOKEN）+ 时间戳)
     * 24小时内有效
     */
    let sigParameter = ''
    let time = moment().format('YYYYMMDDHHmmss')
    sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time)
    let url = `${Rest_URL}/2013-12-26/Accounts/${ACCOUNT_SID}/SMS/TemplateSMS?sig=${sigParameter}`

    // 请求参数
    let body = {
      to: phone,
      appId: AppID,
      templateId: '1',
      datas: [code, "1"]
    }

    console.log(body);
    // 请求头配置
    let authorization = Base64.encode(ACCOUNT_SID + ':' + time)
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Content-Length': JSON.stringify(body).length + '',
      'Authorization': authorization
    }

    // 发送请求
    request({
      method: 'POST',
      url: url,
      headers: headers,
      body: body,
      json: true
    }, function (error, response, body) {
      console.log(body);
      if (body.statusCode === '000000') {
        resolve({result: true,code})
      } else {
        reject({result: false,code:''})
      }
    });
  })


}


 


module.exports = {
  randomCode, sendCode
}        