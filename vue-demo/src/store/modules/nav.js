
// 数据
let state = {
  toggle: false,

  // 当前头部导航
  current: -1,

  // 头部导航
  headerNav: [
    {
      label: '首页',
      index: '/index',
      // subNav: []
    },

    // sys1
    {
      label: 'sys1',
      index: '/sys1',
      subNav: [
        {
          label: '模块一',
          index: '/sys1/add'
        }
      ]
    },

    // 工具
    {
      label: '常用组件',
      index: '/tpl',
      subNav: [
        {
          label: '表格',
          index: '/tpl/table',
    
          // 对应子导航
          subNav: [
            {
              label: '表格分页',
              index: '/tpl/table/table_pager'
            },
            {
              label: '树形表格',
              index: '/tpl/table/table_tree',
            },
            {
              label: '表格搜索/操作',
              index: '/tpl/table/table_tool',
            },
            {
              label: '表格分类',
              index: '/tpl/table/table_class',
            },
          ]
        },
        {
          label: '表单',
          index: '/tpl/form',
          subNav: [
            {
              label: '富文本编辑器',
              index: '/tpl/form/editor',
            },
            {
              label: '异步级联多选面板',
              index: '/tpl/form/selector',
            },
            {
              label: '级联面板',
              index: '/tpl/form/cascader',
            },
          ]
        },
        {
          label: '弹窗',
          index: '/tpl/dialog',
          subNav: []
        },
        {
          label: '其他',
          index: '/tpl/others',
          subNav: [
            {
              label: 'pdf',
              index: '/tpl/others/pdf'
            },
            {
              label: 'swiper',
              index: '/tpl/others/swiper'
            },
          ]
        },
      ]
    }
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