import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    DELETE FROM main.posts
    WHERE 
    post_id = $1 
    AND 
    community = (SELECT community_id FROM main.communities WHERE LOWER(name) = LOWER($2))
    AND
    author = $3
    RETURNING post_id
`

const deletePost = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query(query, [
      req.params.postId,
      req.params.community,
      req.userId
    ])
    if (rowCount === 0) {
      throw Error('post not found')
    }
    res.send({ message: `post ${rows[0].post_id} has been deleted` })
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default deletePost
