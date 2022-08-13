const { query } = require('../../config/dbPool')

// 分类
const getCommodityByDiscount = async (ctx) => {
  const { page, limit } = ctx.request.query
  const res = await query(`SELECT * from commodity where discount < 1`)
  if (res.result) {
    ctx.res.$success({
      data: res.data.slice((page - 1) * limit, page * limit),
      count: res.data.length
    })
  } else {
    ctx.res.$error("请求失败");
  }
  
}

module.exports = {
  getCommodityByDiscount
}