import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from '@/store/index.js'
import service from '@/utils/request'
import VueAMap from 'vue-amap';

Vue.use(Vant);
Vue.use(VueAMap);
Vue.prototype.$axios = service
Vue.config.productionTip = false
service.defaults.baseURL = '/api'
import { Lazyload } from 'vant';
Vue.use(Lazyload);
// Vue.use(Lazyload, {
//   lazyComponent: true,
// });
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '3e96b769e47f68fd80d4233603ea2393',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件
import '@/components/SvgIcon/index.js'
Vue.component('svg-icon', SvgIcon)


new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
