import { Request, Response, NextFunction } from 'express'
import pool from '../database'

interface Decoded {
  userId: number
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = 'SELECT username FROM main.users WHERE user_id = $1'
    const { rowCount } = await pool.query(query, [req.session!.userId])
    if (rowCount === 0) {
      throw Error
    }
    next()
  } catch (e) {
    res.status(401).send({ message: 'please authenticate' })
  }
}

export default auth
