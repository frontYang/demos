const Router = require('koa-router')
const router = new Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tools = require('../../config/tools')
const keys = require('../../config/keys')
const passport = require('koa-passport')

// 引入Usesr模板
const User = require('../../models/User')

// 引入input验证
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = {
    msg: 'success'
  }
})

/**
 * @route GET api/users/current
 * @desc 用户信息接口地址,返回用户信息
 * @access 接口是私密的
 */
router.get('/current', passport.authenticate('jwt', {
  session: false
}), async (ctx) => {
  ctx.body = {
    id: ctx.state.user.id,
    name: ctx.state.user.name,
    email: ctx.state.user.email,
    avatar: ctx.state.user.avatar,
  }
})


/**
 * @route GET api/users/login
 * @desc 登录接口
 * @access 接口是公开的
 */
router.post('/login', async (ctx) => {
  const { errors, isValid } = validateLoginInput(ctx.request.body)

  // 判断是否验证通过
  if(!isValid){
    ctx.status = 400
    ctx.body = errors
    return
  }

  // 查询
  const findResult = await User.find({
    email: ctx.request.body.email
  })

  // 判断
  if(findResult.length == 0){
    ctx.tatus = 404;
    ctx.body = { 'email': '用户不存在' }
  }else {
    // 查到后，验证密码
    const password = ctx.request.body.password
    const userPassword = findResult[0].password
    const result = await bcrypt.compareSync(password, userPassword)

    // 验证通过
    if(result){
      // 返回token
      ctx.status = 200;
      const payload = {
        id: User.id,
        name: User.name,
        avatar: User.avatar
      }

      const token = jwt.sign(payload, keys.secretOrKey, {
        expiresIn: 3600
      })

      ctx.body = {
        success: true,
        token: 'Brearer ' + token   //'Brearer ' 这个是必须的
      }
    }else {
      ctx.status = 400
      ctx.body = {
        password: '密码错误'
      }
    }
  }
})

/** 注册接口 */
router.post('/register', async (ctx) => {
  // console.log(ctx.request.body)
  const { errors, isValid } = validateRegisterInput(ctx.request.body)

  // 判断是否验证通过
  if(!isValid){
    ctx.status = 400
    ctx.body = errors
    return
  }

  // 存储到数据库
  // step1: 查询
  const findResult = await User.find({
    email: ctx.request.body.email
  })

  if(findResult.length > 0) {
    ctx.status = 500
    ctx.body = {
      'email': '邮箱已被占用'
    }
  }else {
    // 如果没有在全球公认头像中找到头像，则显示默认的
    const avatar = gravatar.url(ctx.request.body.email, {s: 200, r: 'pg', d: 'mm'})

    // 获取客户端传入的参数
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: tools.enbcrypt(ctx.request.body.password),
      avatar: avatar
    })

    // 存储到数据库
    await newUser.save().then((user) => {
      ctx.body = user
    }).catch( err => {
      console.log(err)
    })
  }
})


module.exports = router.routes()
