// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './plugins/http'
import moment from 'moment'



Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.use(axios)
/* eslint-disable no-new */
// 全局过滤器
// 格式化日期
Vue.filter('fmtDate', (value, fmtString) => {
  return moment.unix(value).format(fmtString)
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
