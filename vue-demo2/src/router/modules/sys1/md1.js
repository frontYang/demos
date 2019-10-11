

let Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/sys1/${view}.vue`);

export default {
  path: "/sys1/md1/:id",
  name: "md1",
  meta: {
    title: 'md1'
  },
  component: () => Loader('Md1'),
  children: [

  ]  
}