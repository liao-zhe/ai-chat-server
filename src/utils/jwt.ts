import jwt from 'jsonwebtoken'
import { jwtKeys } from '../config/db.config'

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, jwtKeys.privateKey, {
    expiresIn: '24h',
    algorithm: 'RS256'
  })
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, jwtKeys.publicKey, { algorithms: ['RS256'] })
  } catch (error) {
    return null
  }
}
