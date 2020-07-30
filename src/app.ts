import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import signup from './routes/signup'
import login from './routes/login'
import community from './routes/community'
import post from './routes/post'
import user from './routes/user'

const app = express()

app.use(cors())
app.use(compression({ level: 1 }))
app.use(helmet())

app.use(express.json())

app.use('/', signup)
app.use('/', login)
app.use('/c', community)
app.use('/c', post)
app.use('/u', user)

app.get('/*', (req, res) => {
  res.status(404).send({ error: 'endpoint does not exist' })
})

export default app
