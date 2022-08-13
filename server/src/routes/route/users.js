const router = require('koa-router')()
const {
  login,
  register,
  resetPassword,
  newAudit, 
  getAudit, 
  deleteAudit , 
  resetNickName, 
  sendCodeByPone
} = require('../../app/controller/user')
// 模块路由前缀
router.prefix("/users")

router.post('/', (ctx, next) => {
  ctx.body = "this 啊"
})

/*
 * 用户登录接口
 * @param {username} 用户名
 * @param {password} 用户密码
*/

router.post('/Login', login)

router.post('/Register', register)

router.post('/resetPassword', resetPassword)

router.post('/newAudit', newAudit)

router.post('/deleteAudit', deleteAudit)

router.get('/getAudit', getAudit)

router.post('/resetNickName', resetNickName)

router.post('/sendCodeByPone', sendCodeByPone)

 
module.exports = router