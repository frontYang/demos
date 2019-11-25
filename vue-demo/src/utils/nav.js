// 导航
export default [
  {
    label: '首页',
    index: '/index'
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
            index: '/tpl/table/table_tree'
          },
          {
            label: '表格搜索/操作',
            index: '/tpl/table/table_tool'
          },
          {
            label: '表格分类',
            index: '/tpl/table/table_class'
          }
        ]
      },
      {
        label: '表单',
        index: '/tpl/form',
        subNav: [
          {
            label: '富文本编辑器',
            index: '/tpl/form/editor'
          },
          {
            label: '异步级联多选面板',
            index: '/tpl/form/selector'
          },
          {
            label: '级联面板',
            index: '/tpl/form/cascader'
          }
        ]
      },
      {
        label: '弹窗',
        index: '/tpl/dialog',
        subNav: []
      },
      {
        label: '日历',
        index: '/tpl/calendar',
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
          }
        ]
      }
    ]
  }
]
