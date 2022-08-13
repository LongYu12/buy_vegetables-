 
const vertyfyTOken = require('../token')

// 响应体中间件
module.exports = async (ctx, next) => {
  let token = ctx.request.header.authorization
  let verify = vertyfyTOken(token, ctx.request.url)

  // if (!verify.next) {
  //   ctx.body = verify.body
  //   return
  // }
  // ctx.userId = verify.userId
  // 成功回调
  ctx.res.$success = (data,token=null,code=200)=>{
    const _data = {
      code,data: null,token
    }
    if (typeof data === 'object') {
      _data.msg = "success"
      _data.data = data
    } else {
      _data.msg = data
    }
    ctx.body = _data
  }

  // 报错回调
  ctx.res.$error = (err, code = 500) => {
    const _data = {
      code,
    }
    if (typeof err == "object") {
      _data.msg = "error"
      _data.data = JSON.stringify(err)
    } else {
      _data.msg = err
    }
    ctx.body = _data
  }

  await next()
}


 

