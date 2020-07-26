import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    UPDATE main.posts
    SET body = $1, updated_at = NOW()
    WHERE 
    post_id = $2 
    AND 
    community = (SELECT community_id FROM main.communities WHERE LOWER(name) = LOWER($3))
    RETURNING post_id
`

const updatePost = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query(query, [
      req.body.body,
      req.params.postId,
      req.params.community
    ])
    if (rowCount === 0) {
      throw Error('unable to update post')
    }
    res.send({ message: `post ${rows[0].post_id} has been updated` })
  } catch ({ message: error }) {
    res.status(400).send({ error })
  }
}

export default updatePost
