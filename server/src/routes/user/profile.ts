import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT COUNT(post_id) AS no_posts, username, join_date FROM main.users
    LEFT JOIN main.posts ON main.users.user_id = main.posts.author
    WHERE LOWER(username) = LOWER($1)
    GROUP BY main.users.user_id
`

const profile = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query(query, [req.params.username])
    if (rowCount === 0) {
      throw new Error('user not found')
    }
    res.send(rows[0])
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default profile
