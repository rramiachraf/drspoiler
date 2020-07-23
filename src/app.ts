import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import signup from './routes/signup'
import login from './routes/login'
import community from './routes/community'

const app = express()

app.use(cors())
app.use(compression())
app.use(helmet())

app.use(express.json())

app.use('/api', signup)
app.use('/api', login)
app.use('/api/community', community)

app.get('/*', (req, res) => {
  res.status(404).send({ error: 'endpoint does not exist' })
})

export default app
