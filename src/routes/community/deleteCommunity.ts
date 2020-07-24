import { Request, Response } from 'express'
import pool from '../../database/index'

const deleteCommunityQuery = `
    DELETE FROM main.communities 
    WHERE LOWER(name) = LOWER($1)
    RETURNING name
`

const deleteCommunity = async (req: Request, res: Response) => {
  try {
    const { community } = req.params
    const { rows } = await pool.query(deleteCommunityQuery, [community])
    res.send({ message: `${rows[0].name} has been deleted` })
  } catch ({ message: error }) {
    res.status(500).send({ error })
  }
}

export default deleteCommunity
