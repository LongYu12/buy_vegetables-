// Sql语句
// 引入动态SQL类
const { SQL } = require('../utils/sqlHandel')

// 实现派生类
class userSql extends SQL {
  super(option) {
    this.option = option
  }
}

// 实例user派生类
const user = new userSql({table: "user", connect: ""})
 
// 
module.exports = {
  user
}