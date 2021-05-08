import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from '@/store/index.js'
import service from '@/utils/request'
Vue.use(Vant);
Vue.prototype.$axios = service
Vue.config.productionTip = false
service.defaults.baseURL = '/api'

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
