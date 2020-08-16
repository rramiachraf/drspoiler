import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT username, join_date FROM main.users
    WHERE LOWER(username) = LOWER($1)
`

const profile = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query(query, [req.params.username])
    if (rowCount === 0) {
      throw new Error('user not found')
    }
    res.send(rows)
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default profile
