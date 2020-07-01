import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { jwtSecret } from '../config'
import pool from '../database'

interface Decoded {
  userId: number
  iat: number
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')!
    const { userId } = (await jwt.verify(token, jwtSecret)) as Decoded
    const query = 'SELECT username FROM main.users WHERE user_id = $1'
    const { rowCount } = await pool.query(query, [userId])
    if (rowCount === 0) {
      throw Error('user not found')
    }
    req.userId = userId
    next()
  } catch (e) {
    res.status(401).send({ message: 'please authenticate' })
  }
}

export default auth
