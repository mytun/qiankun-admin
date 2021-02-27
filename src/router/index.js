import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import WeiLayout from '@/layout/WeiLayout'
Vue.use(VueRouter)
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  componentT: true,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'redirect',
      componentT: true,
      component: () => import('@/views/redirect')
    }
  ]
},
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    componentT: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    componentT: true,
    component:  () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    componentT: true,
    component:  () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    componentT: true,
    component:  () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    componentT: true,
    redirect: 'index',
    children: [
      {
        path: 'index',
        componentT: true,
        component:  () => import('@/views/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },{
    path: '/user',
    component: Layout,
    hidden: true,
    componentT: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        componentT: true,
        component: (resolve) => require(['@/views/user'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
