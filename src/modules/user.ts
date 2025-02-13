import pool from '../utils/db'

interface User {
  id: number
  username: string
  password: string
}

export class UserModule {
  // 检查用户是否存在
  static async findByUsername(username: string): Promise<User | null> {
    const [rows]: any = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )
    return rows.length > 0 ? rows[0] : null
  }

  // 创建新用户
  static async create(username: string, password: string): Promise<User> {
    const [result]: any = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    )
    return {
      id: result.insertId,
      username,
      password
    }
  }
}
