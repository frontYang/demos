
import Sys1 from '@/views/Sys1'

// 子路由
import Add from './sys1/add'

export default {
  path: '/sys1/:id',
  name: 'sys1',
  component: Sys1,
  meta: {
    title: '系统一'
  },
  children: [
    Add
  ]
}
