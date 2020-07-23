import { Request, Response } from 'express'
import pool from '../../database'

const updatePoster = async ({ artworkKey, params }: Request, res: Response) => {
  const bucket = 'drspoiler-artworks'
  const url = `https://${bucket}.s3.amazonaws.com/${artworkKey}`
  const { community } = params
  const query = `
    UPDATE main.communities 
    SET poster = $1
    WHERE LOWER(name) = LOWER($2)
    `
  try {
    await pool.query(query, [url, community])
    res.status(200).send({ community, url })
  } catch ({ message }) {
    res.status(400).send()
  }
}

export default updatePoster
