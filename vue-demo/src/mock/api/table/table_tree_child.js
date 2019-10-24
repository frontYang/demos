
import Mock from 'mockjs'
const Random = Mock.Random;

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
