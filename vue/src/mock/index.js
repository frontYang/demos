/* eslint-disable */
// 获取 mock.Random 对象
// 引入mockjs
import Mock from 'mockjs'

const Random = Mock.Random;

// 登录
Mock.mock(/\/api\/login$/, (req, res) => {
  return Mock.mock({
    "code": 0,
    "message": "Success",
    "data": {
      password: "yangzhifang",
      token: "d1a71459cada49c6baa57156d468f2b0",
      username: "yangzhifang"
    }
  })
})

// 表格数据
Mock.mock(/\/api\/list/, (req, res) => {
  var id = req.url.split('?current=')[1] || 1
    
  return Mock.mock({
    "code": 0,
    "message": '',
    "data": {
      "count": 2, // 总页数
      "total": 20, // 总条数
      "current|+1": id, // 页码
      'list|10': [
        {
          'id|+1': 1,
          'date': '2016-05-04',
          'name': Random.cname('@cname()'),
          'address': Random.region('@region()')
        },
      ]
    }
  })
})

// 搜索
Mock.mock(/\/api\/search/, (req, res) => {
  var id = req.url.split('?id=')[1] || 1

  return Mock.mock({
    "code": 0,
    "message": '',
    "data": {
      'list|10': [
        {
          'id|+1': 1,
          'date': '2016-05-04',
          'name': Random.cname('@cname()'),
          'address': Random.region('@region()')
        },
      ]
    }
  })
})

// 级联多选面板
Mock.mock(/\/api\/cascader$/, (req, res) => {
  var data = Mock.mock({
    'list|1-50': [
      {
        'value|+1': 1,
        'label|1-2': Random.region(),
        'children|0-25': [
          {
            'value|+1': 1,
            'label|1-2': Random.region(),
            'children|0-10': [
              {
                'value|+1': 1,
                'label|1-2': Random.region(),
              }
            ]
          }
        ]
      }
    ]
  })
  return {
    "code": 0,
    "message": '',
    "data": data
  }
})

// 异步级联多选
Mock.mock(/\/api\/cascader1$/, (req, res) => {
  var data = Mock.mock({
    'list|20': [
      {
        'value|+1': 1,
        'label|1-2': Random.region(),
        'has_children|1-2': false,
        'checked': false
      }
    ]
  })
  return {
    "code": 0,
    "message": '',
    "data": data
  }
})

// 异步级联多选
Mock.mock(/\/api\/cascader2$/, (req, res) => {
  var data = Mock.mock({
    'list|1-20': [
      {
        'value|+1': 41,
        'label|1-2': Random.region(),
        'has_children|1-2': false,
        'checked': false
      }
    ]
  })
  return {
    "code": 0,
    "message": '',
    "data": data
  }
})

// 异步级联多选
Mock.mock(/\/api\/cascader3$/, (req, res) => {
  var data = Mock.mock({
    'list|1-20': [
      {
        'value|+1': 82,
        'label|1-2': Random.region(),
        'has_children': false,
        'checked': false
      }
    ]
  })
  return {
    "code": 0,
    "message": '',
    "data": data
  }
})

// table tree
Mock.mock(/\/api\/table_tree$/, (req, res) => {

  var data  = Mock.mock({
    'list|20': [
      {
        'id|+1': 1,
        'date': '2016-05-04',
        'name': Random.cname('@cname()'),
        'address': Random.region('@region()'),
        'hasChildren|1-2': true
      },
    ]
  })
  return {
    "code": 0,
    "message": '',
    "data": data
  }
})

//  table tree 子数据
Mock.mock(/\/api\/table_tree_child/, (req, res) => {
  console.log(req, res)
  var id = req.url.split('?id=')[1]
  
  var data = Mock.mock({
    'list|1-10': [
      {
        'id|+1': id * 100 + 100,
        'date': '2016-05-04',
        'name': Random.cname('@cname()'),
        'address': Random.region('@region()')
      }
    ]
  })
  return {
    "code": 0,
    "message": '',
    "data": data
  }
})
