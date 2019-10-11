

import Mock from 'mockjs'
const Random = Mock.Random;

// 级联多选面板
Mock.mock(/\/api\/cascader$/, (req, res) => {
  var data = Mock.mock({
    'list|10-20': [
      {
        'value|+1': 1,
        'label|1-2': Random.region(),
        'children|15': [
          {
            'value|+1': 1,
            'label|1-2': Random.region(),
            'children|50': [
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