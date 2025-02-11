// 鉴权中间件
import { Context, Next } from 'koa'
import { verifyToken } from '../utils/jwt'

export const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization?.split(' ')[1]

  if (!token) {
    ctx.status = 401
    ctx.body = { message: '未提供认证令牌' }
    return
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    ctx.status = 401
    ctx.body = { message: '无效的认证令牌' }
    return
  }

  ctx.state.user = decoded
  await next()
}
