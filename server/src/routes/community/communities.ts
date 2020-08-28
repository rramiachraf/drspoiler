import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT community_id, name, work, description 
    FROM main.communities
    LIMIT 10
`

const communities = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(query)
    res.send(rows)
  } catch (e) {
    res.status(400).send()
  }
}

export default communities
