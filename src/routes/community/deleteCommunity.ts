import { Request, Response } from 'express'
import { parse } from 'path'
import pool from '../../database/index'
import { Bucket } from '../../config'
import { deleteObject } from '../../aws/upload'

const deleteCommunityQuery = `
    DELETE FROM main.communities 
    WHERE LOWER(name) = LOWER($1)
    RETURNING name, poster
`

const deleteCommunity = async (req: Request, res: Response) => {
  try {
    const { community } = req.params
    const { rows } = await pool.query(deleteCommunityQuery, [community])
    const { name, poster } = rows[0]
    const options = { Key: parse(poster).base, Bucket }
    if (poster) {
      await deleteObject(options)
    }
    res.send({ message: `${name} has been deleted` })
  } catch ({ message: error }) {
    res.status(500).send({ error })
  }
}

export default deleteCommunity
