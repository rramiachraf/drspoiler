import express from 'express'
import helmet from 'helmet'
import signup from './routes/signup'
import login from './routes/login'
import community from './routes/community'

const app = express()

app.use(helmet())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use('/api', signup)
app.use('/api', login)
app.use('/api/community', community)

export default app
