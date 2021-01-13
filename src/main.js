import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps, start } from 'qiankun';
Vue.config.productionTip = false


registerMicroApps([
    {
        name: 'vue', // app name registered
        entry: '//localhost:7100',
        container: '#vue',
        activeRule: '/vue',
    }
]);
start();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
