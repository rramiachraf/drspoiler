import { Router } from 'express'
import bcrypt from 'bcrypt'
import validator from 'validator'
import pool from '../database/index'
import generateError from '../helpers/generateError'

const route = Router()

route.post('/signup', async (req, res) => {
  const query = `
    INSERT INTO 
    main.users(username, email, password) 
    VALUES($1, $2, $3)
    RETURNING username
  `
  const { username, email, password } = req.body

  try {
    if (!username || !email || !password) {
      throw Error('missing fields')
    }

    if (!validator.isEmail(email)) {
      throw Error('invalid email')
    }

    if (!/^\w+$/.test(username)) {
      throw Error('invalid username')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const values = [
      username.trim().toLowerCase(),
      validator.normalizeEmail(email),
      hashedPassword
    ]

    const { rows } = await pool.query(query, values)

    res.status(201).send({
      message: `Welcome ${rows[0].username}, your account has been created`
    })
  } catch ({ message }) {
    res.status(400).send({ error: generateError(message) })
  }
})

export default route
