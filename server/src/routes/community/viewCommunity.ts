import { Request, Response } from 'express'
import pool from '../../database/index'

const getCommunityInfo = `
    SELECT name, work, description,
    (SELECT username FROM main.users AS u WHERE u.user_id = main.communities.created_by) AS created_by, 
    created_at 
    FROM main.communities 
    WHERE LOWER(name) = LOWER($1)
`

const viewCommunity = async (req: Request, res: Response) => {
  const { community } = req.params
  try {
    const { rowCount, rows } = await pool.query(getCommunityInfo, [community])
    if (rowCount === 0) {
      throw Error('community not found')
    }
    res.send(rows[0])
  } catch ({ message }) {
    res.status(404).send({ error: message })
  }
}

export default viewCommunity
