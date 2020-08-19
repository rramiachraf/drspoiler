import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT post_id, title, SUBSTRING(body, 1, 300) || '...' AS body, url_slug,
    (SELECT username FROM main.users WHERE user_id = author) AS author,
    (SELECT name FROM main.communities WHERE community_id = community) AS community,
    created_at, updated_at FROM main.posts
    WHERE author = (SELECT user_id FROM main.users WHERE username = $1)
    ORDER BY created_at DESC
    LIMIT 10
`

const postsByUser = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query(query, [req.params.username])
    if (rowCount === 0) {
      throw new Error('user not found')
    }
    res.send(rows)
  } catch (e) {
    res.status(404).send([])
  }
}

export default postsByUser
