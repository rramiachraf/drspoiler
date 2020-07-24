import { Request, Response, NextFunction } from 'express'
import pool from '../database/index'

const query = `
    SELECT name FROM main.communities
    WHERE LOWER(name) = LOWER($1)
    `

const communityExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rowCount } = await pool.query(query, [
      req.params.community || req.query.community
    ])
    if (rowCount === 0) {
      throw Error('community not found')
    }
    next()
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default communityExists
