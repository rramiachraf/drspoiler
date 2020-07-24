import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import signup from './routes/signup'
import login from './routes/login'
import community from './routes/community'
import post from './routes/post'

const app = express()

app.use(cors())
app.use(compression())
app.use(helmet())

app.use(express.json())

app.use('/', signup)
app.use('/', login)
app.use('/c', community)
app.use('/p', post)

app.get('/*', (req, res) => {
  res.status(404).send({ error: 'endpoint does not exist' })
})

export default app
