
// 数据
let state = {
  allData: [],
  current: 0,
}

// store的计算属性
let getters = {

}

// 更改状态(同步)
let mutations = {
  setAllData: (state, data) => {
    state.allData = data.list
  },
  setCurrent: (state, data) => {
    state.current = data
  }
}

// 更改状态（异步）
let actions = {
  commitAllData(ctx){
    ctx.commit('setAllData')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}