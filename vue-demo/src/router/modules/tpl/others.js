
const Loader = (view) => import(/* webpackChunkName: "chunk-[request][index]" */`@/views/tpl/${view}.vue`)

export default {
  path: '/tpl/others/:id',
  name: 'others',
  meta: {
    title: '其他'
  },
  component: () => Loader('Others'),
  children: [
    {
      path: '/tpl/others/Pdf/:id',
      name: 'Pdf',
      meta: {
        title: 'PDF'
      },
      component: () => Loader('others/Pdf')
    },
    {
      path: '/tpl/others/swiper/:id',
      name: 'swiper',
      meta: {
        title: 'swiper'
      },
      component: () => Loader('others/Swiper')
    }
  ]
}
