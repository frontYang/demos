
import Mock from 'mockjs'
const Random = Mock.Random

// table tree
Mock.mock(/\/api\/table_tree$/, (req, res) => {
  var data = Mock.mock({
    'list|20': [
      {
        'id|+1': 1,
        'date': '2016-05-04',
        'name': Random.cname('@cname()'),
        'address': Random.region('@region()'),
        'hasChildren|1-2': true
      }
    ]
  })
  return {
    'code': 0,
    'message': '',
    'data': data
  }
})
