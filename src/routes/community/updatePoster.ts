import { Request, Response } from 'express'
import pool from '../../database'
import { uploadArtwork } from '../../aws/upload'
import { Bucket } from '../../config'

const upload = uploadArtwork.single('poster')

const query = `
  UPDATE main.communities 
  SET poster = $1
  WHERE LOWER(name) = LOWER($2)
`

const updatePoster = (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    const url = `https://${Bucket}.s3.amazonaws.com/${req.artworkKey}`
    const { community } = req.params
    try {
      if (err) {
        throw Error(err.message)
      }
      await pool.query(query, [url, community])
      res.status(200).send({ community, url })
    } catch ({ message: error }) {
      res.status(400).send({ error })
    }
  })
}

export default updatePoster
