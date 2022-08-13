const router = require('koa-router')()
const path = require('path')
const context = require('../utils/autoLoadFile')
 
/* 
* @param {Array} arr 需要注册路由的文件列表
*/
function importAll(arr) {
  arr.forEach(item => {
    // 这种方式位嵌套理由
    router.use('/api', item.data.routes(), item.data.allowedMethods())
    
  }); 
}
importAll(context(path.join(__dirname, "./route"), false))

module.exports = router