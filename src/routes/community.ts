import { Router } from 'express'
import auth from '../middlewares/auth'
import pool from '../database'
import generateError from '../helpers/generateError'

const route = Router()

route.post('/create', auth, async (req, res) => {
  const { userId } = req
  const { name, work, description, picture } = req.body
  const query = `
    INSERT INTO main.communities
    (name, work, description, picture, created_by) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING name;
  `
  try {
    if (!name || !work) {
      throw Error('missing fields')
    }
    const { rows } = await pool.query(query, [
      name,
      work,
      description,
      picture,
      userId
    ])
    res.send({ message: `${rows[0].name} has been created.` })
  } catch ({ message }) {
    res.status(400).send({ error: generateError(message) })
  }
})

export default route
