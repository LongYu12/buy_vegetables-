// MYSQL数据库配置
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const MYSQL_CONFIG = require('./database')
const pools = {};
/**
 * 连接池是否已存在,不存在创建连接池
 */
if(!pools.hasOwnProperty('data')) {
  pools["data"] = mysql.createPool(MYSQL_CONFIG)
}

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pools["data"].getConnection((err, connection) => {
      if (err) {
        console.log(err, '数据库连接失败');
      } else {
        console.log('数据库连接成功', sql);
        connection.query(sql, values, (err, res) => {
          console.log('数据库查询结构', err, res);
          if (err) {
            reject(err)
          } else {
            connection.release()
            resolve({
              result: true,
              data: res
            })
          }
        })
      }
    })
  })
}

module.exports = {
  query
}