import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import pool from '../database/index'
import generateError from '../helpers/generateError'
import { signupValidation } from '../helpers/schema'

const route = Router()

const createNewUser = `
  INSERT INTO 
  main.users(username, email, password) 
  VALUES($1, $2, $3)
  RETURNING username
`

route.post('/signup', signupValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array())
  }

  const { username, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const values = [username.toLowerCase(), email, hashedPassword]
    const { rows } = await pool.query(createNewUser, values)
    res.status(201).send()
  } catch ({ message }) {
    res.status(400).send({ error: generateError(message) })
  }
  
})

export default route
