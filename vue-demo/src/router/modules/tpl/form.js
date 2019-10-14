
let Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/tpl/${view}.vue`);

export default {
  path: "/tpl/form/:id",
  name: "form",
  meta: {
    title: '表单'
  },
  component: () => Loader('Form'),
  children: [
    {
      path: "/tpl/form/editor/:id",
      name: "editor",
      meta: {
        title: '编辑器'
      },
      component: () => Loader('form/Editor2')
    },
    {
      path: "/tpl/form/cascader/:id",
      name: "cascader",
      meta: {
        title: '多选级联面板'
      },
      component: () => Loader('form/Cascader')
    },
    {
      path: "/tpl/form/selector/:id",
      name: "selector",
      meta: {
        title: '异步多选级联面板'
      },
      component: () => Loader('form/Selector')
    },
  ]
}