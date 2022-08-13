/* 
========自动加载文件==========
*/

const path = require('path')
const fs = require('fs')
const getPathInfo = (p) => path.parse(p) // 返回文件相关信息

/**
 * @description // 递归读取文件，类似于webpack的require.context()
 * @param {String} directory 文件目录
 * @param {Boolean} useSubdirectories 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 */

const autoLoadFile = (directory, useSubdirectories = false, extList = [".js"]) => {
  const filesList = []
  readFileList(directory, useSubdirectories, extList);
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory) // 同步读取文件信息
    files.forEach(item => {
      // 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
      const fullPath = path.join(directory, item)
      const stat = fs.statSync(fullPath) // 返回文件的路劲信息
      // isDirectory() 判定是否是目录文件
      if (stat.isDirectory() && useSubdirectories) {
        // 原版 readFileList(path.join(directory, item), useSubdirectories, extList);
        readFileList(path.join(directory, item), useSubdirectories, extList)
      } else {
        const info = getPathInfo(fullPath)
        extList.includes(info.ext) && filesList.push(fullPath)
      }
    })
  }
  // 生成需要的对象
  const res = filesList.map((item) => ({
    path: item,
    data: require(item),
    ...getPathInfo(item),
  }));
  return res;
}



module.exports = autoLoadFile;