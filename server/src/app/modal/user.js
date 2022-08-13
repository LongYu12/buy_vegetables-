// 对象层

const { user } = require('../../dbhelper/users')
const { query } = require('../../config/dbPool')
const { JsonWebTokenError } = require('jsonwebtoken')


const findUserServe = async(target) => {
  let res = JSON.parse(JSON.stringify(await query(user.find(target))))
  return  res
}

const findUserWeb = async (
  target = null,
  replacer = "phone, password"
) => {
  let res = JSON.parse(
    JSON.stringify(await query(user.find(target, replacer)))
  )
  return res
}

// 
const findDetail = async (target = null) => {
  let res = JSON.parse(
    JSON.stringify(await query(`select * from user where userId="${target}"`))
  )
  return res
}


module.exports = {
  findUserServe,
  findUserWeb,
  findDetail
}