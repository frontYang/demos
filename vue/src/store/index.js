import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import selector from './modules/selector'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login,
    selector,
  },
  strict: debug,
})