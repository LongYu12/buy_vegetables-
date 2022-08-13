const { query } = require('../../config/dbPool')

// 分类
const classfy = async (ctx) => {
  const res = await query(`SELECT * from tag where parentId is null `)
  if (res.result) {
    let parent = res.data
    for (let item of parent) {
       let childRes = await query(`SELECT * from tag where parentId="${item.tagId}" `)
       if (childRes.result) {
         item.children = childRes.data
       }
    }
    ctx.res.$success(parent)
  } else {
    ctx.res.$error("请求失败");
  }
}

module.exports = {
 classfy
}