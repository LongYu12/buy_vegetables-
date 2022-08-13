const router = require('koa-router')()
const {classfy} = require('../../app/controller/tags')
// 模块路由前缀
router.prefix("/tag")

router.post('/', (ctx, next) => {
  ctx.body = "this 啊"
})

router.get('/getClassfy', classfy)


module.exports = router