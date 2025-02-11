import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

// 使用第三方中间件解析json和urlencoded数据
app.use(bodyParser())

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hello World'
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('Server is running on port 3000~🚀')
})
