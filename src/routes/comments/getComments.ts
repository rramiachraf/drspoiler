import { Request, Response } from 'express'
import pool from '../../database'

const query = `
    SELECT comment_id, text, username, post_id,
    main.comments.created_at AS created_at, 
    main.comments.updated_at as updated_at
    FROM main.comments
    INNER JOIN main.users ON main.users.user_id = main.comments.user_id
    WHERE post_id = $1
    ORDER BY main.comments.created_at
`

const addComment = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(query, [req.params.postId])
    res.send(rows)
  } catch ({ message: error }) {
    res.status(404).send({ error })
  }
}

export default addComment
