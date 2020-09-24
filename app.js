const Koa = require('koa')
const app = new Koa()
// 基本配置中间件
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 设置允许跨域
const cors = require('koa2-cors')
// 接口路由导入
const index = require('./routes/index')
const yao = require('./routes/yaoModel')
const spider = require('./routes/spider')
const user = require('./routes/userModel')
// 静态资源
const static = require('koa-static')
const path = require('path')
// 使用jwt
const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(static(path.join(__dirname, './static')))
app.use(cors())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// jwt
const secret = 'ax_jwt'
app.use(jwtKoa({
  secret
}).unless({
  path: ['/login', '/','/register'] //数组中的路径不需要通过jwt验证
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(spider.routes(), spider.allowedMethods())
app.use(yao.routes(), yao.allowedMethods())
app.use(user.routes(), user.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
