import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import store from './store'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import Pagination from "@/components/Pagination";
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/mytun.scss' // mytun css
import permission from './directive/permission'
import './assets/icons'
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}
Vue.use(permission)
// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
