import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import './assets/css/public.css'
import api from './axios/api'
import {directive_onerror} from './directive/index'
import Vconsole from 'vconsole'
// const vConsole = new Vconsole() // 开启手机调试模式
 
// 使用路由
const vue = createApp(App)
vue.use(router)
vue.mount('#app')
vue.use(ElementPlus)
 
directive_onerror(vue)
// 定义全局属性
vue.config.globalProperties.$http = api

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    vue.component(iconName, item)
  }
}
 