/* eslint-disable */
// import "@babel/polyfill"
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import https from "./utils/https"
import utils from "./utils/utils"
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

Vue.use(ElementUI)


/* sessionStorage.setItem('user_info', JSON.stringify({
  openid: 'oD22m5F6MdO3Kl0qWrRIYKZ2KTgE'
})) */


/* import { checkLogin } from './utils/request';

router.beforeEach((to, from, next) => {
  checkLogin().then(res => {
    if (res.code == -1) {
      store.commit('loginOut')
    } else {
      store.commit('setUser', {
        nick_name: res.data.nick_name,
        icon: res.data.icon
      })
      sessionStorage.setItem('user_info', JSON.stringify(res.data))
    }

    if (to.path == '/login') {
      store.commit('loginOut')
    }
    let user_info = sessionStorage.getItem('user_info')

    if (!user_info && (to.path != '/login' && to.path != '/authorize' && to.path != '/index')) {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}) */

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')