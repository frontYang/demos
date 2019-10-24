
import Mock from 'mockjs'
const Random = Mock.Random;


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