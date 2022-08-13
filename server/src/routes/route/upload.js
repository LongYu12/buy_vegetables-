const router = require('koa-router')()
const { uploadImg, saveEditor, uploadVideo, uploadAppendix, avatar } = require('../../app/controller/upload')
// 模块路由前缀
router.prefix("/upload")

router.post('/', (ctx, next) => {
  ctx.body = "this 啊"
})

router.post('/image', uploadImg)
router.post('/saveEditor', saveEditor)
router.post('/video', uploadVideo)
router.post('/appendix', uploadAppendix)
router.post('/avatar', avatar)

module.exports = router