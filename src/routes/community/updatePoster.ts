import { Request, Response } from 'express'
// import pa
import pool from '../../database'

const updatePoster = async ({ artworkKey, body }: Request, res: Response) => {
  const bucket = 'drspoiler-artworks'
  const url = `https://${bucket}.s3.amazonaws.com/${artworkKey}`
  const { work } = body
  const query = `
    UPDATE main.communities 
    SET poster = $1
    WHERE LOWER(name) = LOWER($2)
    `
  try {
    await pool.query(query, [url, work])
    res.status(200).send({ work, url })
  } catch ({ message }) {
    res.status(400).send()
  }
}

export default updatePoster
