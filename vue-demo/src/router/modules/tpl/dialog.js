
let Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/tpl/${view}.vue`);

export default {
  path: "/tpl/dialog/:id",
  name: "dialog",
  meta: {
    title: '对话框'
  },
  component: () => Loader('Dialog'),
  children: [

  ]  
}