import axios from 'axios'
import qs from 'qs'
import { ElLoading } from 'element-plus'
let Loading:any  
let path = "http://10.2.28.37:3060/"		 	//请求根地址
// let path = "http://localhost:3060/"		 	//请求根地址

// 全局默认配置
axios.defaults.baseURL = path
axios.defaults.headers.common['Authorization'] = localStorage.getItem('kuaishi') + ''

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  Loading.close()
  let { data } = response
  if (data.token) {
    localStorage.setItem('kuaishi', data.token)
    axios.defaults.headers.common['Authorization'] = data.token;
  }
  return response;
}, function (error) {
  Loading.close()
  return Promise.reject(error);
});
 
const get = (url: string, params: object) => {
  setLoading()
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      alert('服务出错')
    })
  })
}

const post = (url: string, data: object) => {
  setLoading()
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data)).then(res => {
      resolve(res.data)
    }).catch(err => {
      alert('服务出错')
    })
  })
}


function setLoading () {
  Loading = ElLoading.service({ fullscreen: true,  text: '小菜努力加载中'})
}

export {
  get, post
}