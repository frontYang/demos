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
