import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/db.config'

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '24h' })
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, jwtSecret)
  } catch (error) {
    return null
  }
}
