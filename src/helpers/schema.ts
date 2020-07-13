import { body } from 'express-validator'

const username = body('username')
  .not()
  .isEmpty()
  .withMessage('username must be provided')
  .matches(/^\w+$/)
  .withMessage('invalid username')
  .trim()

const email = body('email')
  .not()
  .isEmpty()
  .withMessage('email must be provided')
  .isEmail()
  .withMessage('invalid e-mail')
  .normalizeEmail()

const password = body('password')
  .not()
  .isEmpty()
  .isLength({ min: 8 })
  .withMessage('password must be at least 8 characters')

export const signupValidation = [email, username, password]

export const loginValidation = [username, password]
