let fs = require('fs')
const path = require('path')
const { query } = require('../../config/dbPool')

const uploadImg = async (ctx) => {
  let key = Object.keys(ctx.request.files)[0]
  const { path: filePath, type } = ctx.request.files[key]
  console.log('收到图片', ctx.request.files[key]);
  if (type.indexOf('image') == -1) {
    ctx.res.$error('请上传图片', 401)
  } else {
    let arr = filePath.split('\\')
    let path = 'http://127.0.0.1:8086/img/' + arr[arr.length - 1]
    ctx.body = {
      errno: 0,
      data: [{
        url: path,
        alt: '',
        href: path
      }]
    }
  }
}

// 用户头像上传
const avatar = async (ctx) => {
  let key = Object.keys(ctx.request.files)[0]
  const { path: filePath, type } = ctx.request.files[key]
  const { userId } = ctx
  // console.log('收到图片', ctx.request.files[key]);
  if (type.indexOf('image') == -1) {
    ctx.res.$error('请上传图片', 401)
  } else {
    let arr = filePath.split('\\')
    let path = 'http://127.0.0.1:8086/img/' + arr[arr.length - 1]
    let res  =   await query(`UPDATE user SET headPortraitUrl = '${path}' WHERE userId = "${userId}"`)// 关键代码，
    if (res.result) {
      ctx.body = {
        errno: 0,
        data: [{
          url: path,
          alt: '',
          href: path
        }]
      }
    } else {
      ctx.body = {
        errno: -1,
        data: [{
          url: path,
          alt: '',
          href: path
        }]
      }
    }
    
  }
} 

// 上传视频
const uploadVideo = async (ctx) => {
  let key = Object.keys(ctx.request.files)[0]
  const { path: filePath, type } = ctx.request.files[key]
  console.log('收到视频');
  if (type.indexOf('video') == -1) {
    ctx.res.$error('请上传视频', 401)
  } else {
    let arr = filePath.split('\\')
    let path = 'http://127.0.0.1:8086/video/' + arr[arr.length - 1]
    ctx.body = {
      errno: 0,
      data: {
        url: path
      }
    }
  }
}

// 上传附件
const uploadAppendix = async (ctx) => {
  let key = Object.keys(ctx.request.files)[0]
  const {name, path: filePath, type } = ctx.request.files[key]
  let arr = filePath.split('\\')
  let path = 'http://127.0.0.1:8086/Appendix/' + arr[arr.length - 1]
  ctx.body = {
    errno: 0,
    data: {
      url: path,
      name: name
    }
  }
}

// 富文本内容
const saveEditor = async (ctx) => {
  const req = ctx.request.body
  if (req && req.html.length) {
    let filePath = path.join(__dirname, '../../../public/editor/') + Math.random() + '.txt'
    
    console.log(filePath);
    // fs.writeFileSync(filePath, req.html)
    // // 读取
    // ctx.res.$success(fs.readFileSync(filePath, 'utf-8'))
  }
}

module.exports = {
  uploadImg, saveEditor, uploadVideo, uploadAppendix, avatar
}  