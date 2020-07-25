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
    WHERE post_id = $1 AND LOWER(main.communities.name) = LOWER($2)
`

const getPost = async (req: Request, res: Response) => {
  try {
    console.log([req.params.postId, req.params.communityName])
    const { rowCount, rows } = await pool.query(query, [
      req.params.postId,
      req.params.communityName
    ])
    console.log(rows)
    if (rowCount === 0) {
      throw Error('post not found')
    }
    res.send(rows[0])
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default getPost
