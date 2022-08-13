
const Koa = require('koa')
const app = new Koa() // 创建app实例
const fs = require('fs')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890abcdefghijklmmnopqrstwyz', 32);
 
// 引入中间件
const onerror = require('koa-onerror')
const koaBody = require('koa-body');
const logger = require('koa-logger')
const router = require('./src/routes/index')
const cors = require('koa-cors')
const path = require('path')
// 注册 Error
onerror(app)


 
// koaBody
app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, '/public'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    // maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小限制
    onFileBegin(name, file) {// 文件上传前操作
      console.log(name, file);
      let dir = ''
      if (file.type.indexOf('image') !== -1) {
        dir = path.join(__dirname, '/public/img/')
        file.path = dir + nanoid() + '.' + file.type.split('/')[1]
      } else if (file.type.indexOf('video') !== -1) {
        dir = path.join(__dirname, '/public/video/')
        file.path = dir + nanoid() + '.' + file.type.split('/')[1]
      } else {
        dir = path.join(__dirname, '/public/Appendix/')
        file.path = dir + nanoid() + '.' + file.type.split('/')[1]
      }
      if (!fs.existsSync(dir)) { // 没有该文件夹创建一个Appendix
        fs.mkdirSync(dir);
      }
    }
  }
}))//会自动解析请求体的信息  

// 注册日志
app.use(logger())

// 注册静态资源
app.use(require('koa-static')(__dirname + '/public'))

// 注册跨域
app.use(cors()) 

// 注册自定义中间件
require('./src/middelwares/index')(app)

// 注册路由
app.use(router.routes(), router.allowedMethods())

// logger-handling(记录器处理)
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  console.log(ctx);
  const ms = new Date() - start
  console.log(`记录器处理:${ctx} ${ctx.request.method} ${ctx.url} - ${ms}ms`);
})

// 错误处理和打印
app.on("error", (err, ctx) => {
  console.log('server error', err, ctx);
})

module.exports = app

