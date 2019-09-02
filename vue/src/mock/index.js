/* eslint-disable */
// 获取 mock.Random 对象
// 引入mockjs
import Mock from 'mockjs'

const Random = Mock.Random;

// 顶部导航数据
Mock.mock(/\/api\/list/, (req, res) => {
  var data = Mock.mock({
    "total_record|1-10": 10,
    "total_page|1-10": 2,
    'list|1-20': [
      {
        "ID|+1": 1,
        "USER_ID": "",
        "NAME": "111",
        "DESC": "bygyv",
        "COUNT": "9",
        "TYPE": "1",
        "SHARE": "0",
        "TARGET_ID": "0",
        "TARGET_USER": {
          "NICK_NAME": "xxxxxx"
        },
        "ADD_TIME": "2019-07-01 17:49:29"
      }      
    ]
  })

  return {
    "code": 0,
    "message": '',
    "data": data
  }
})

// 级联多选面板
Mock.mock(/\/api\/cascader$/, (req, res) => {
  var data = Mock.mock({
    'list|1-40': [
      {
        'value|+1': 1,
        'label|1-2': Random.region(),
        'children|0-20': [
          {
            'value|+1': 1,
            'label|1-2': Random.region(),
            'children|0-20': [
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
    'list|1-40': [
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
    'list|1-40': [
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
    'list|1-40': [
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
    'list|1-100': [
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
Mock.mock(/\/api\/table_tree_child$/, (req, res) => {
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
