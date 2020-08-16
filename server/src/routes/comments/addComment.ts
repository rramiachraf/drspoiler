import { Request, Response } from 'express'
import pool from '../../database'

const insertComment = `
    INSERT INTO main.comments (text, post_id, user_id)
    VALUES($1, $2, $3)
    RETURNING comment_id
`

const getComment = `
    SELECT comment_id, text, username, post_id,
    main.comments.created_at AS created_at, 
    main.comments.updated_at as updated_at
    FROM main.comments
    INNER JOIN main.users ON main.users.user_id = main.comments.user_id
    WHERE post_id = $1 AND comment_id = $2
`

const addComment = async (req: Request, res: Response) => {
  try {
    const { rows: added } = await pool.query(insertComment, [
      req.body.text,
      req.params.postId,
      req.session!.userId
    ])
    const { rows } = await pool.query(getComment, [
      req.params.postId,
      added[0].comment_id
    ])
    res.status(201).send(rows[0])
  } catch ({ message: error }) {
    res.status(400).send({ error })
  }
}

export default addComment
