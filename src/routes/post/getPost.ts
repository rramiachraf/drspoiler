import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT 
    main.posts.post_id, title, body, 
    main.posts.created_at, main.posts.updated_at,
    COUNT(comment_id) AS no_comments,
    main.communities.name AS community, main.users.username AS author
    FROM main.posts
    INNER JOIN main.communities ON 
    main.communities.community_id = main.communities.community_id
    INNER JOIN main.users ON 
    main.users.user_id = main.posts.author
    LEFT JOIN main.comments ON
    main.comments.post_id = main.posts.post_id
    WHERE main.posts.post_id = $1 AND LOWER(main.communities.name) = LOWER($2)
    GROUP BY main.posts.post_id, main.communities.name, main.users.username
`

const getPost = async (req: Request, res: Response) => {
  try {
    const { rowCount, rows } = await pool.query(query, [
      req.params.postId,
      req.params.community
    ])
    if (rowCount === 0) {
      throw Error('post not found')
    }
    res.send(rows[0])
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default getPost
