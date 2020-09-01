import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT username, email FROM main.users
    WHERE user_id = $1
`

const settings = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(query, [req.session!.userId])
    res.send(rows[0])
  } catch (e) {
    res.status(400).send()
  }
}

export default settings
