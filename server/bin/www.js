// 添加项目入口

let app = require('../app')
let debug = require('debug')('demo:server')
let http = require('http')
let os   = require('os')

function getIPv4(){
  var interfaces = os.networkInterfaces();//获取网络接口列表
  var ipv4s = [];//同一接口可能有不止一个IP4v地址，所以用数组存

   Object.keys(interfaces).forEach(function (key){
       interfaces[key].forEach(function (item){
           //跳过IPv6 和 '127.0.0.1'
           if ( 'IPv4' !== item.family || item.internal !== false )return;
           ipv4s.push(item.address);//可用的ipv4s加入数组
          //  console.log(key+'--'+item.address);
       })        
   })

 return ipv4s[0];//返回一个可用的即可
}
    
 

// 从环境中获取端口并存储在 Express 中。
let port = normalizePort('3060');
 
// 创建 http 服务
let server = http.createServer(app.callback())

// 连接服务端口和服务监听
server.listen(port, '', function () {
  const host = server.address().address
  const port = server.address().port
  console.log("本地地址为 http://localhost:%s", port)
  console.log("局域网地址 http://%s:%s", getIPv4(), port)
})
server.on('error', onError)
server.on('listening', onListening) 

// 将端口规范化为数字、字符串或 false。
function normalizePort(val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

/* 
  HTTP 服务器“错误”事件的事件侦听器。
*/
function onError(error) {
  if (error.syscall != 'listen') {
    throw error;
  }

  let bind = typeof port == 'string' ? 'Pipe' + port : 'Port' + port

  // 用友好的消息处理特定的监听错误
  switch (error.code) {
    case 'EACCES':
        console.log(bind + '没有请求权限，需要提升权限');
      break;
    case 'EADDRINUSE':
      console.log(bind + '已被占用');
       break;
    default:
      throw error;
      break;
  }
}


/* 
  HTTP 服务器“监听”事件的事件监听器。
*/ 
function onListening() {
  let addr = server.address()
  let bind = typeof port == 'string' ? 'pipe' + port : 'port' + port
  debug('Listening on' + bind)
}


 






 