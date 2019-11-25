
const Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/sys1/${view}.vue`)

export default {
  path: '/sys1/add/:id',
  name: 'add',
  meta: {
    title: '批量创建'
  },
  component: () => Loader('Add'),
  children: [

  ]
}
