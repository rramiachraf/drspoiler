import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config'

export default async (payload: object) => {
  try {
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: '1day' })
    return token
  } catch (e) {
    return e
  }
}
