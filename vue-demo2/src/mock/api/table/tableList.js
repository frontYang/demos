import Mock from 'mockjs'
const Random = Mock.Random;

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
