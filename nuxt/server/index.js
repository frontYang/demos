const Log4js = require('koa-log4')
const logConfig = require('../config/log4js')
const path = require('path')
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const autoRoutes = require('./autoRoutes')
const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'


app.use(async (ctx, next) => {
  ctx.Log4js = Log4js  //给koa2上下文添加Log4js
  await next()
})

autoRoutes.auto(app)


// 生成logs目录 && 加载配置文件 start  
const logger = Log4js.getLogger('app')
const logPath = path.join(__dirname, 'logs')
try {
  require('fs').mkdirSync(logPath)
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', err)
    process.exit(1)
  }
}
Log4js.configure(logConfig, {cwd: logPath})
// 生成logs目录 && 加载配置文件 end
//把开发过程的日志去掉
/* if (!config.dev) {
  app.use(Log4js.koaLogger(Log4js.getLogger('http'), {level: 'auto'}))
} */


async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
