
// 数据
const state = {
  toggle: false,

  // 当前头部导航
  current: -1
}

// store的计算属性
const getters = {

}

// 更改状态(同步)
const mutations = {
  setToggle: (state, data) => {
    state.toggle = data
  },
  setNavCurrent: (state, data) => {
    state.current = data
  }
}

// 更改状态（异步）
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
