
let state = {
  username: null,
  avatar: null
}

let getters = {
  
}

let mutations = {
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

let actions = {
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
