import Vue from 'vue'
import App from './App.vue'
import qs from "qs";


Vue.config.productionTip = false

import router from '@/router'

import store from '@/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import API from '@/api'

Vue.use(ElementUI)

Vue.prototype.$API = API
Vue.prototype.$qs = qs;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
