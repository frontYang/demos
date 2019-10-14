
import Mock from 'mockjs'
const Random = Mock.Random;

// 异步级联多选1
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