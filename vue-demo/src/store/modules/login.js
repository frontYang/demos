
const state = {
  username: null,
  avatar: null
}

const getters = {

}

const mutations = {
  setUser: (state, data) => {
    state.username = data.username
    state.avatar = data.avatar
  },
  loginOut: (state) => {
    state.username = null
    state.avatar = null
    localStorage.removeItem('token')
  }
}

const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
