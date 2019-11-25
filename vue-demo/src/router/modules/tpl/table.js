const Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/tpl/${view}.vue`)

export default {
  path: '/tpl/table/:id',
  name: 'table',
  component: () => Loader('Table'),
  meta: {
    title: '表格'
  },
  children: [
    {
      path: '/tpl/table/table_pager/:id',
      name: 'table_pager',
      meta: {
        title: '表格分页'
      },
      component: () => Loader('table/TablePager')
    },
    {
      path: '/tpl/table/table_tree/:id',
      name: 'table_tree',
      meta: {
        title: '表格树形'
      },
      component: () => Loader('table/TableTree')
    },
    {
      path: '/tpl/table/table_tool/:id',
      name: 'table_tool',
      meta: {
        title: '表格工具'
      },
      component: () => Loader('table/TableTool')
    },
    {
      path: '/tpl/table/table_class/:id',
      name: 'table_class',
      meta: {
        title: '表格分类'
      },
      component: () => Loader('table/TableClass')
    },
    {
      path: '/tpl/table/table_test/:id',
      name: 'table_test',
      meta: {
        title: '表格测试'
      },
      component: () => Loader('table/TableTest')
    }
  ]
}
