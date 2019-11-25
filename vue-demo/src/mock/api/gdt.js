
import Mock from 'mockjs'
const Random = Mock.Random

// 获取账号信息
Mock.mock(/\/api\/get_account$/, (req, res) => {
  return Mock.mock({
    'code': 0,
    'message': 'Success',
    'data|5-8': [{
      'label': Random.title(1),
      'value|+1': 1
    }]
  })
})

// 获取应用id
Mock.mock(/\/api\/get_appid$/, (req, res) => {
  return Mock.mock({
    'code': 0,
    'message': 'Success',
    'data|5-8': [{
      'label': Random.title(1),
      'value|+1': 1
    }]
  })
})

// 获取渠道包
Mock.mock(/\/api\/get_channel_package$/, (req, res) => {
  return Mock.mock({
    'code': 0,
    'message': 'Success',
    'data|5-8': [{
      'label': Random.title(1),
      'value|+1': 1
    }]
  })
})

// 获取推广计划
Mock.mock(/\/api\/get_promot_plan$/, (req, res) => {
  return Mock.mock({
    'code': 0,
    'message': 'Success',
    'data|5-8': [{
      'label': Random.title(1),
      'value|+1': 1
    }]
  })
})

// 获取定向包
Mock.mock(/\/api\/get_direct_package$/, (req, res) => {
  return Mock.mock({
    'code': 0,
    'message': 'Success',
    'data|5-8': [{
      'label': Random.title(1),
      'value|+1': 1
    }]
  })
})
