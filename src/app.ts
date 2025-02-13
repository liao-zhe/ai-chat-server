import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import authRouter from './routes/auth'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// 创建 Koa 实例
const app = new Koa()

// 全局错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err: any) {
    console.error('Server Error:', err)
    ctx.status = err.status || 500
    ctx.body = {
      success: false,
      message: err.message || '服务器内部错误'
    }
  }
})

// 注册中间件
app.use(bodyParser())

// 注册路由
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

// 未匹配路由处理
app.use(async (ctx) => {
  ctx.status = 404
  ctx.body = {
    success: false,
    message: '接口不存在'
  }
})

// 启动服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

export default app
