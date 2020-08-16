import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    DELETE FROM main.comments
    WHERE comment_id = $1 AND post_id = $2 AND user_id = $3
    RETURNING comment_id
`

const removeComment = async (req: Request, res: Response) => {
  const { commentId, postId } = req.params
  try {
    const { rowCount } = await pool.query(query, [
      commentId,
      postId,
      req.session!.userId
    ])
    if (rowCount === 0) {
      throw new Error('Comment not found')
    }
    res.send()
  } catch ({ message: error }) {
    res.status(404).send({ error: 'Comment not found' })
  }
}

export default removeComment
