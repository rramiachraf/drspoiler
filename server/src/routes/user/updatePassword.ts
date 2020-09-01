import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import pool from '../../database'

const query = `
    UPDATE main.users
    SET password = $1
    WHERE user_id = $2
`

const updatePassword = async (req: Request, res: Response) => {
  const { password, cPassword } = req.body
  try {
    if (password !== cPassword) {
      throw new Error('unmatched password')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query(query, [hashedPassword, req.session!.userId])
    res.send()
  } catch (e) {
    res.status(400).send()
  }
}

export default updatePassword
