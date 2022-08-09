import Vue from 'vue'
import App from './App.vue'
import qs from "qs";
import GoEasy from 'goeasy'


Vue.config.productionTip = false

import router from '@/router'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import API from '@/api'

Vue.use(ElementUI)

Vue.prototype.$API = API
Vue.prototype.$qs = qs;

// 引入即时通讯的goeasy
Vue.prototype.goeasy = GoEasy.getInstance({
  host:"hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
  appkey:"BC-86642c92b6e94f9ea31e711b3ee699f6",
  modules:['pubsub']//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});



// 引入vuex
import store from '@/store'


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
