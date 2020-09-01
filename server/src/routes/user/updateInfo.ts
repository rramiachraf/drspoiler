import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    update main.users
    SET username = $1, email = $2
    WHERE user_id = $3
`

const settings = async (req: Request, res: Response) => {
  const { email, username } = req.body
  try {
    await pool.query(query, [
      username,
      email,
      req.session!.userId
    ])
    res.send()
  } catch (e) {
    res.status(400).send()
  }
}

export default settings
