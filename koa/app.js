// 引入依赖
const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')


// 实例化
const app = new Koa()
const router = new Router()

// 引入
const users = require('./routes/api/users')


app.use(bodyParser())


//路由
router.get('/', async (ctx) => {
  ctx.body = {
    msg: 'hello'
  }
})

// 连接数据库
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    console.log('mongodb connect...')
  })
  .catch(() => {
    console.log('connect error!')
  })

  app.use(passport.initialize())
  app.use(passport.session())

  require('./config/passport')(passport)

// 配置路由地址
router.use('/api/users', users)

// 配置路由
app.use(router.routes())
   .use(router.allowedMethods())

const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`server starting on ${port}`)
})

