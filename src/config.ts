import dotenv from 'dotenv'

dotenv.config()

declare const process: {
  env: {
    PORT: number
    CONNECTION_STRING: string
    JWT_SECRET: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}

// ENV
const port = process.env.PORT || 5000
const connectionString = process.env.CONNECTION_STRING
const jwtSecret = process.env.JWT_SECRET
const AWS_accessKeyId = process.env.AWS_ACCESS_KEY_ID
const AWS_secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const Bucket = 'drspoiler-artworks'

export {
  port,
  connectionString,
  jwtSecret,
  AWS_accessKeyId,
  AWS_secretAccessKey,
  Bucket
}
