import { Request, Response } from 'express'
import pool from '../../database/index'
import generateError from '../../helpers/generateError'

const createNewCommunity = `
    INSERT INTO main.communities
    (name, work, description, created_by) 
    VALUES($1, $2, $3, $4)
    RETURNING name;
`

const createCommunity = async (req: Request, res: Response) => {
  const { userId } = req
  const { name, work, description } = req.body

  try {
    if (!name || !work) {
      throw Error('missing fields')
    }

    const { rows } = await pool.query(createNewCommunity, [
      name,
      work,
      description,
      userId
    ])
    res.send({ message: `${rows[0].name} has been created` })
  } catch ({ message }) {
    res.status(400).send({ error: generateError(message) })
  }
}

export default createCommunity
