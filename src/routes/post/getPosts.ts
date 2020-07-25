import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT 
    post_id, title, body, main.posts.created_at, updated_at, 
    main.communities.name AS community, main.users.username AS author
    FROM main.posts
    INNER JOIN main.communities ON 
    main.communities.community_id = main.communities.community_id
    INNER JOIN main.users ON 
    main.users.user_id = main.posts.author
    WHERE LOWER(main.communities.name) = LOWER($1)
    ORDER BY main.posts.created_at DESC
    LIMIT $2
    OFFSET $3
`

const getPosts = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query(query, [
      req.params.community,
      req.query.limit || 10,
      req.query.skip || 0
    ])
    if (rowCount === 0) {
      throw Error('no post found in this comunity')
    }
    res.send(rows)
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default getPosts
