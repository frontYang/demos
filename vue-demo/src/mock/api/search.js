
import Mock from 'mockjs'
const Random = Mock.Random;


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