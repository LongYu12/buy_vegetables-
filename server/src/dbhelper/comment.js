// Sql语句
// 引入动态SQL类
const { SQL } = require('../utils/sqlHandel')

// 实现派生类
class commentSql extends SQL {
  super(option) {
    this.option = option
  }
}

// 实例user派生类
const comment = new commentSql({table: "comment", connect: ""})  
 
// 
module.exports = {
  comment
}