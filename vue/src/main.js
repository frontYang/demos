/* eslint-disable */
// import "@babel/polyfill"
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import https from "./utils/https"
import utils from "./utils/utils"
import request from "./utils/request"
import validate from "./utils/validate"
import ElementUI from 'element-ui'
import './assets/theme/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import 'element-ui/lib/theme-chalk/index.css'
import './mock/index'

Vue.config.performance = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = false
Vue.prototype.$https = https
Vue.prototype.$utils = utils
Vue.prototype.$request = request
Vue.prototype.$validate = validate

Vue.use(ElementUI)


// 判断登录状态
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') || null
  let username = localStorage.getItem('username') || null  

  if (token == null && (to.path != '/login')) {
    next({ path: '/login' })
  } else {
    store.commit('setUser', {
      username: username
    })
    
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')