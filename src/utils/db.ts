import mysql from 'mysql2/promise'
import { dbConfig } from '../config/db.config'

// 创建连接池
const pool = mysql.createPool(dbConfig)

export default pool
