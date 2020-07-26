import { Request, Response } from 'express'
import slugify from 'slugify'
import pool from '../../database'

const query = `
    INSERT INTO main.posts
    (title, body, author, community, url_slug)
    VALUES
    ($1, $2, $3, 
    ( SELECT community_id FROM main.communities WHERE LOWER(name) = LOWER($4) ),
    $5
    )
    RETURNING post_id
`

const addPost = async (req: Request, res: Response) => {
  const { title, body } = req.body
  const urlSlug = slugify(req.body.title, {
    replacement: '_',
    lower: true,
    strict: true
  })
  try {
    const { rows } = await pool.query(query, [
      title,
      body,
      req.userId,
      req.params.community,
      urlSlug
    ])
    res.status(201).send({ postId: rows[0].post_id })
  } catch ({ message: error }) {
    res.status(400).send({ error })
  }
}

export default addPost
