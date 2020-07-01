import dotenv from 'dotenv'

dotenv.config()

declare const process: {
  env: {
    PORT: number
    CONNECTION_STRING: string
    JWT_SECRET: string
  }
}

const port = process.env.PORT || 5000
const connectionString = process.env.CONNECTION_STRING
const jwtSecret = process.env.JWT_SECRET

export { port, connectionString, jwtSecret }
