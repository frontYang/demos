const router = require('koa-router')()
router.get('/reporter', async function (ctx, next) {
  let logger = ctx.Log4js.getLogger('reporter')
  logger.error(ctx.query.err)
  ctx.body = {result: 'ok'}
})
module.exports = router