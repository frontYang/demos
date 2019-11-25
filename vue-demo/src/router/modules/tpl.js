
import Tpl from '@/views/Tpl'

// 子路由
import Table from './tpl/table'
import Form from './tpl/form'
import Others from './tpl/others'
import Dialog from './tpl/dialog'
import Calendar from './tpl/calendar'

export default {
  path: '/tpl/:id',
  name: 'tpl',
  component: Tpl,
  meta: {
    title: 'Tpl'
  },
  children: [
    Table,
    Form,
    Others,
    Dialog,
    Calendar
  ]
}
