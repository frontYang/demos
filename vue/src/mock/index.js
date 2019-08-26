/* eslint-disable */
// 获取 mock.Random 对象
// 引入mockjs
import { mock } from 'mockjs'

// 顶部导航数据
mock('/api/list', (req, res) => {
  return {
    code: 0,
    message: '',
    data: [
      {
        
      }
    ]
  }
})
