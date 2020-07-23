import { Request, Response } from 'express'
import pool from '../../database/index'

const deleteCommunityQuery = `
    DELETE FROM main.communities 
    WHERE LOWER(name) = LOWER($1)
`

const deleteCommunity = async (req: Request, res: Response) => {
  try {
    const { community } = req.params
    const query = await pool.query(deleteCommunityQuery, [community])
    res.send()
  } catch ({ message }) {
    res.status(500).send({ message })
  }
}

export default deleteCommunity
