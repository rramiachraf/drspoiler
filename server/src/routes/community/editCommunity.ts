import { Request, Response } from 'express'
import pool from '../../database/index'

const query = `
    UPDATE main.communities
    SET work = $1, description = $2
    WHERE name = $3 AND created_by = $4
`

const EditCommunity = async (req: Request, res: Response) => {
  try {
    await pool.query(query, [
      req.body.work,
      req.body.description,
      req.params.community,
      req.session!.userId
    ])
    res.send()
  } catch (e) {
    res.status(400).send()
  }
}

export default EditCommunity
