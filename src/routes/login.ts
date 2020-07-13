import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import pool from '../database'
import generateJWT from '../helpers/generateJWT'
import { loginValidation } from '../helpers/schema'

const route = Router()

route.post('/login', loginValidation, async (req: Request, res: Response) => {
  const genericError = 'Incorrect username or password'
  const query = `
    SELECT username, password, user_id FROM main.users
    WHERE username = $1
  `
  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) {
      throw Error(genericError)
    }

    const { rows, rowCount } = await pool.query(query, [req.body.username])
    if (rowCount === 0) {
      throw Error(genericError)
    }

    const matchedPasswords = await bcrypt.compare(
      req.body.password,
      rows[0].password
    )
    if (!matchedPasswords) {
      throw Error(genericError)
    }

    const userId = rows[0].user_id

    const token = await generateJWT({ userId })

    res.send({
      message: `Welcome back ${rows[0].username}`,
      token
    })
  } catch ({ message }) {
    res.status(404).send({ message })
  }
})

export default route
