// 拼接sql语句
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('1234567890abcdefghijklmmnopqrstwyz', 32); 
 
/**
 * 生成唯一ID
 * @returns 'sfes-fesfe-stdrg'
 *  */  
async function  createId() {
  let res = await nanoid().split('');
  res[7] = '-'
  res[15] = '-'
  res[23] = '-'
  res = res.join('')
  return res
}

/**
 * 将对象统一处理成 "where key1 = value1 and key2 = value2"
 * @param {*} target 要处理的语句的对象
 * @returns "where key1 = value1 and key2 = value2 "
 *  */
function whereAnd(target, option) {
  let _table = option.table.split(",") // 将
  let sql = "", count = 0
  for (let key in target) {
    if (target[key]) {
      target[key] = target[key].trim()
      sql += `${count > 0 ? " and" : ""} ${key}='${target[key]}'`
    }
    count++
  }
  return sql.length ? _table.length > 1 ? " and" + sql : " where" + sql : ''
}


function connectTable(where, option) {
  let _sql = ""
  let _table = option.table.split(",") // 将
  if (_table.length > 1) {// 多表查询
    let _connect = ' where'
    _table.forEach((item, index) => {
      _connect += `${index === 0 ? "" : " ="} ${item}.${option.connect}` // option.connect字段名
    })
    _sql += _connect
  }
  if (where) {
    _sql += whereAnd(where, option)
  }
  return _sql
}

// 将对象转换成“key1 = value1 , key2 = value2"
function keyValue(obj) {
  let _str = "", count = 0
  for (let key in obj) {
    _str += `${count > 0 ? "," : ""} ${key}="${obj[key]}"`
    count++
  }
  return _str
}


class SQL {
  constructor(option) {
    this.$option = option
  }
  // 查询所有
  findAll(where) {
    let sql = `select * from ${this.$option.table} `
    return sql + connectTable(where, this.$option) + ';'
  }
  // 部分查询
  find(where, replacer = "") {
    let sql = `select * from ${this.$option.table}`
     
    if (replacer) {
      if (typeof replacer === "object") {
        replacer = replacer.join(',') // 将数组转换位字符串
      }
      sql = `select ${replacer} from ${this.$option.table}`;
      
      return sql + connectTable(where, this.$option) + ';'
    } else {
      return this.findAll(where)
    }
  }
  /**
   * 添加语句
   * @param {Object} values 至少有必填值
   * @param {String} idName id的名称
   *  */ 
  async add(values, idName) {
    let table = this.$option.table
    let newStr = `"${await createId()}"`, index = 0
    let keyStr = `${idName}`
    // let newStr = `${parseInt((new Date()).getTime()/100000)}`, index = 0
    for (let key in values) {
      keyStr += `, ${key}`
      newStr += `, ${typeof values[key] == 'string'? '"'+values[key]+'"' : values[key]}`
      index ++
    }
    // newStr += `, ${(new Date()).getTime()}`
    return `insert into ${table} (${keyStr}) values(${newStr})  ;` // 只有mysql有这种插入数据的形式INSERT INTO tablename SET column_name1  =  value1, column_name2  =  value2，…;
  }
  /**
   * 修改
   * @param {} params 
   * @param {} where 
   * @returns 
   */
  edit(params, where, table = this.$option.table) {
    return (
      `update ${table} set ${keyValue(params)}${whereAnd(where, {
        table
      })};`
    )
  }
  // 删除
  del(where, table = this.$option.table) {
    return `DELETE FROM ${table} ${whereAnd(where, {table})};`
  }
}


module.exports = {
  whereAnd,
  SQL,
};