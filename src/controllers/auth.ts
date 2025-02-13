import { Context } from 'koa'
import { UserModule } from '../modules/user'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

// 注册
export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any

  try {
    // 检查用户是否已存在
    const existingUser = await UserModule.findByUsername(username)
    if (existingUser) {
      ctx.status = 409
      ctx.body = { message: '用户名已存在' }
      return
    }

    // 创建新用户
    const hashedPassword = await hashPassword(password)
    const newUser = await UserModule.create(username, hashedPassword)

    const token = generateToken({ id: newUser.id, username })
    ctx.status = 200
    ctx.body = {
      message: '注册成功',
      token,
      user: { id: newUser.id, username }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '注册失败' }
  }
}

// 登录
export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any

  try {
    const user = await UserModule.findByUsername(username)
    if (!user) {
      ctx.status = 401
      ctx.body = { message: '用户名或密码错误' }
      return
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      ctx.status = 401
      ctx.body = { message: '用户名或密码错误' }
      return
    }

    const token = generateToken({ id: user.id, username })
    ctx.status = 200
    ctx.body = {
      message: '登录成功',
      token,
      user: { id: user.id, username }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '登录失败' }
  }
}
