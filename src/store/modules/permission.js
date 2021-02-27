import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import WeiLayout from '@/layout/WeiLayout'
import ParentView from '@/components/ParentView';

const permission = {
  state: {
    routes: [],
    roleDate:[],
    addRoutes: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_ROLE_DATE: (state, routes) => {
      state.roleDate = routes
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRoutes.concat(routers)
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata,true)
          console.log(rewriteRoutes)
          console.log("=====")
          console.log(sidebarRoutes)
          commit('SET_ROLE_DATE', sdata)
          // rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', rewriteRoutes)
          commit('SET_SIDEBAR_ROUTERS', sidebarRoutes)
          resolve(rewriteRoutes)
        })
      })
    }
  }
}

function filterAsyncRouter(asyncRouterMap,  type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      if (route.component === 'Layout') {
        if (route.componentT){
          route.component = Layout
        }else {
          route.component = WeiLayout
        }

      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if(route.componentT) {
        route.component = loadView(route.component)
      }else{
        delete route.component
      }
    }
    if(route.path.indexOf("/system")!=-1){
      route.path = '/system/'+route.path
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  // eslint-disable-next-line no-unused-vars
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => { // 路由懒加载
  return  () => require(`@/views/${view}`)
}

export default permission
