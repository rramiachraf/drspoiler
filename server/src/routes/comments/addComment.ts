import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    INSERT INTO main.comments (text, post_id, user_id)
    VALUES($1, $2, $3)
    RETURNING 
    comment_id, 
    text,
    post_id,
    (SELECT username FROM main.users WHERE user_id = user_id) AS username, 
    created_at, 
    updated_at
`

const addComment = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(query, [
      req.body.text,
      req.params.postId,
      req.session!.userId
    ])
    res.status(201).send(rows[0])
  } catch ({ message: error }) {
    res.status(400).send({ error })
  }
}

export default addComment
