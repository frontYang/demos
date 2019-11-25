
const Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/tpl/${view}.vue`)

export default {
  path: '/tpl/calendar/:id',
  name: 'calendar',
  meta: {
    title: '对话框'
  },
  component: () => Loader('Calendar'),
  children: [

  ]
}
