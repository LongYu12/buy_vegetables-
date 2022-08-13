// 控制层 业务代码

const { sign } = require('jsonwebtoken') // 获得生成token的方法
const { findUserServe, findUserWeb, findDetail } = require('../modal/user')
const { query } = require('../../config/dbPool')
const { user } = require('../../dbhelper/users')
const { sendCode } = require('../../utils/vertifyCode')
const { SECRET, TIME } = require('../../config/constant');
/**
 * 描述：发送短信验证码
 * @param {*} ctx 
 * 
 */
const sendCodeByPone = async (ctx) => {
  const { phone } = ctx.request.body;
  let res =  await sendCode(phone)
  if (res.result) {
    ctx.res.$success({data:res.code})
  } else {
    ctx.res.$error('发送失败', 400)
  }
}

/**
 * 用户登录接口
 * @param {phone} 用户名
 * @param {password} 用户密码
 */
const login = async (ctx) => {
  const req = ctx.request.body;
  const { phone, password } = req
  if (phone) {
    let res = await findUserServe({ phone })// 关键代码，
    if (res.result && res.data.length == 0) {
      ctx.res.$error('用户不存在', 401)
    } else if (res.result && res.data[0].password != password) {
      ctx.res.$error('密码不正确', 402)
    } else if (res.result) {
      let userId = res.data[0].userId
      const token = sign({ userId }, SECRET, {// 关键代码，（这个是生成token的，必须有）
        expiresIn: TIME
      })
      ctx.res.$success({ ...res.data[0] }, token)
    } else {
      ctx.res.$error('请求失败')
    }
  } else {
    ctx.res.$error("请输入用户名和密码", 400);
  }

}

/**
 * 注册用户
 */
const register = async (ctx) => {
  const req = ctx.request.body
  const { phone, password } = req
  if (phone) {
    let data = await findUserWeb({ phone })
    if (data.result && data.data.length !== 0) {
      ctx.res.$error('用户已存在')
      return
    } 
    let param = {
      phone : phone,
      password: password
    }
    const res = await query(await user.add(param, 'userId'))// 关键代码，
    if (res.result) {
      let user = await findUserServe({ phone })
      let userId = user.data[0].userId
      const token = sign({ userId }, SECRET, {
        expiresIn: TIME
      })
      ctx.res.$success({ ...user.data[0] }, token)
    } else {
      ctx.res.$error("请求失败");
    }
  } else {
    ctx.res.$error("错误", 400);
  }
}

/**
 * 重置密码
 */
const resetPassword = async (ctx) => {
  const req = ctx.request.body
  const { oldPassword, newPassword } = req
  const { userId } = ctx
  console.log(oldPassword);
  let data = await findUserServe({ userId })
  if (data.result && data.data[0].password != oldPassword) {
    ctx.res.$error('旧密码错误')
    return
  }
  const res = await query(`UPDATE user SET password = '${newPassword}' WHERE userId = "${userId}"`)
  if (res.result) {
    ctx.res.$success('修改成功')
  } else {
    ctx.res.$error("请求失败");
  }
}



/**
 * 获取所有歌审核员
 *  */
const deleteAudit = async (ctx) => {
  const req = ctx.request.body
  const { userId } = req
  const res = await query(`DELETE from user where userId="${userId}" `)// 关键代码，
  if (res.result) {
    ctx.res.$success('删除成功')
  } else {
    ctx.res.$error("请求失败");
  }
}

/**
 * 获取所有歌审核员
 *  */
const getAudit = async (ctx) => {
  const req = ctx.request.query
  const { page, limit } = req
  const res = await query(`SELECT userId,nickName,headPortraitUrl,gender from user where permission="1" `)// 关键代码，
  if (res.result) {
    ctx.res.$success({
      data: res.data.slice((page - 1) * limit, page * limit),
      count: res.data.length,
    })
  } else {
    ctx.res.$error("请求失败");
  }
}

/**
 * 新建审核员
 */
const newAudit = async (ctx) => {
  const req = ctx.request.body
  const { phone } = req
  if (phone) {
    let data = await findUserWeb({ phone })
    if (data.result && data.data.length !== 0) {
      ctx.res.$error('用户已存在')
      return
    }
    req.permission = 1
    const res = await query(await user.add(req, 'userId'))// 关键代码，
    if (res.result) {
      ctx.res.$success('新建成功')
    } else {
      ctx.res.$error("请求失败");
    }
  } else {
    ctx.res.$error("错误", 400);
  }
}

// 修改用户名
const resetNickName = async (ctx) => {
  const req = ctx.request.body
  const { nickName } = req
  const { userId } = ctx
  const res = await query(`UPDATE user SET nickName = '${nickName}' WHERE userId = "${userId}"`)// 关键代码，
  if (res.result) {
    ctx.res.$success('修改成功')
  } else {
    ctx.res.$error("请求失败");
  }
}



module.exports = {
  login, 
  register, 
  resetPassword, 
  newAudit, 
  getAudit, 
  deleteAudit, 
  resetNickName,
  sendCodeByPone
};