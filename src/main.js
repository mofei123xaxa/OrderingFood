import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from '@/router'

import store from '@/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import API from '@/api'

Vue.use(ElementUI)

Vue.prototype.$API = API

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
