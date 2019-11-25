
// 数据
const state = {
  allData: [],
  current: 0
}

// store的计算属性
const getters = {

}

// 更改状态(同步)
const mutations = {
  setAllData: (state, data) => {
    state.allData = data.list
  },
  setCurrent: (state, data) => {
    state.current = data
  }
}

// 更改状态（异步）
const actions = {
  commitAllData(ctx) {
    ctx.commit('setAllData')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
