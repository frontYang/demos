
// 数据
let state = {
  toggle: false,

  // 当前头部导航
  current: -1,

  // 头部导航
  headerNav: [
    {
      label: '表格',
      index: 'table',

      // 对应子导航
      subNav: [
        {
          label: 'table pager',
          index: 'table_pager',
        },
        {
          label: 'table tree',
          index: 'table_tree',
        },
      ]
    },
    {
      label: '表单',
      index: 'form',
      subNav: [
        {
          label: 'vue2-editor',
          index: 'editor',
        },
        {
          label: '异步级联多选面板',
          index: 'selector',
        },
        {
          label: '级联面板',
          index: 'cascader',
        },
      ]
    },
    {
      label: '弹窗',
      subNav: []
    },
  ]
}

// store的计算属性
let getters = {

}

// 更改状态(同步)
let mutations = {
  setToggle: (state, data) => {
    state.toggle = data
  },
  setNavCurrent: (state, data) => {
    state.current = data
  }
}

// 更改状态（异步）
let actions = {
  
}

export default {
  state,
  getters,
  actions,
  mutations
}