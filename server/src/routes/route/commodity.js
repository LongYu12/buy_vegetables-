const router = require('koa-router')()
const {getCommodityByDiscount} = require('../../app/controller/commodity')
// 模块路由前缀
router.prefix("/commodity")

router.get('/getCommodityByDiscount', getCommodityByDiscount)

module.exports = router