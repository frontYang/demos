
let state = {
  nickName: null,
  avatar: null
}

let getters = {
  
}

let mutations = {
  setUser: (state, data) => {
    state.nickName = data.nick_name
    state.avatar = data.icon
  },
  loginOut: (state) => {
    state.nickName = null
    state.avatar = null
    sessionStorage.removeItem('user_info')
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
