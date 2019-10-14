
import Sys1 from "@/views/Sys1"

// 子路由
import Md1 from "./sys1/md1"

export default {
  path: "/sys1/:id",
  name: 'sys1',
  component: Sys1,
  meta: {
    title: 'Sys1'
  },
  children: [
    Md1
  ]
}