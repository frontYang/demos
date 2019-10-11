import Mock from 'mockjs'

// 登录
Mock.mock(/\/api\/login$/, (req, res) => {
  return Mock.mock({
    "code": 0,
    "message": "Success",
    "data": {
      password: "yangzhifang",
      token: "d1a71459cada49c6baa57156d468f2b0",
      username: "yangzhifang"
    }
  })
})