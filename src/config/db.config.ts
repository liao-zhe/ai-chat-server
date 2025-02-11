import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

const privateKey = fs.readFileSync(
  path.join(process.cwd(), 'private.key'),
  'utf8'
)
const publicKey = fs.readFileSync(
  path.join(process.cwd(), 'public.key'),
  'utf8'
)

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export const jwtKeys = {
  privateKey,
  publicKey
}
