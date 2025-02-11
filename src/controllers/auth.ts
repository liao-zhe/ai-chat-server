import { Context } from 'koa'
import pool from '../utils/db'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any

  try {
    const hashedPassword = await hashPassword(password)
    const [result]: any = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    )

    ctx.body = {
      message: '注册成功',
      userId: result.insertId
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '注册失败' }
  }
}

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any

  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )

    if (rows.length > 0) {
      const isValid = await comparePassword(password, rows[0].password)
      if (isValid) {
        const token = generateToken({ id: rows[0].id, username })
        ctx.body = {
          message: '登录成功',
          token
        }
        return
      }
    }

    ctx.status = 401
    ctx.body = { message: '用户名或密码错误' }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '登录失败' }
  }
}
