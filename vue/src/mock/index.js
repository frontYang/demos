/* eslint-disable */
// 获取 mock.Random 对象
// 引入mockjs
import { mock } from 'mockjs'
// 顶部导航数据
mock('/api/list', (req, res) => {
  return {
    "code": 0,
    "message": '',
    "data": {
      "total_record": 10,
      "total_page": 2,
      "list": [
        {
          "ID": "1",
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
        },
        {
          "ID": "1",
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
        },
        {
          "ID": "1",
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
        },
        {
          "ID": "1",
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
    }
  }
})

// 级联多选面板
mock('/api/cascader', (req, res) => {
  var data = mock({
    'list|1-40': [
      {
        'value|+1': 1,
        'label|1-2': 'hty',
        'children|0-20': [
          {
            'value|+1': 1,
            'label|1-2': 'hgj',
            'children|0-20': [
              {
                'value|+1': 1,
                'label|1-2': 'fh',
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
mock('/api/cascader1', (req, res) => {
  var data = mock({
    'list|1-40': [
      {
        'value|+1': 1,
        'label|1-2': 'hty',
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
mock('/api/cascader2', (req, res) => {
  var data = mock({
    'list|1-40': [
      {
        'value|+1': 41,
        'label|1-2': 'hty',
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
mock('/api/cascader3', (req, res) => {
  var data = mock({
    'list|1-40': [
      {
        'value|+1': 82,
        'label|1-2': 'hty',
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