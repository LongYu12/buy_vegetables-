import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/User/Register.vue')
  },
  {
    path: '/mian',
    name: 'Layout',
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: 'Home',
        name: 'Home',
        meta: {
          title:'首页',
          isSub: false
        },
        component: () => import('../views/Home/index.vue')
      },
      {
        path: 'Basket',
        name: 'Basket',
        meta: {
          title:'小菜蓝',
          isSub: false
        },
        component: () => import('../views/Basket/index.vue')
      },
      {
        path: 'Classfy',
        name: 'Classfy',
        meta: {
          title:'分类',
          isSub: false
        },
        component: () => import('../views/Classfy/index.vue')
      },
      {
        path: 'My',
        name: 'My',
        meta: {
          title:'我的',
          isSub: false
        },
        component: () => import('../views/My/index.vue')
      },
      {
        path: 'Search',
        name: 'Search',
        meta: {
          title:'搜索',
          isSub: true
        },
        component: () => import('../views/Search/index.vue')
      },
      {
        path: 'Adress',
        name: 'Adress',
        meta: {
          title:'地址',
          isSub: true
        },
        component: () => import('../views/Adress/index.vue')
      },
    ]
  },
  
 
] 

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
