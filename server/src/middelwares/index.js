const path = require("path");
const context = require("../utils/autoLoadFile")

// /**
//  * @param {Array} arr 需要注册中间件的文件列表
//  *  */
module.exports = (app) => {
    context(path.join(__dirname, "./middleware"), false).forEach(item => {
    app.use(item.data)
  })
} 