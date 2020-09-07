import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import pgSession from 'connect-pg-simple'
import pool from './database'
import signup from './routes/signup'
import login from './routes/login'
import logout from './routes/logout'
import community from './routes/community'
import post from './routes/post'
import user from './routes/user'
import comment from './routes/comments'
import logged from './routes/user/logged'
import auth from './middlewares/auth'
import communities from './routes/community/communities'
import rateLimit from './middlewares/rateLimit'

const app = express()

app.enable('trust proxy')

app.use(helmet())

app.use(rateLimit)

app.use(
  session({
    name: 'sid',
    store: new (pgSession(session))({ pool }),
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: true,
    proxy: process.env.NODE_ENV === 'production' && true,
    cookie: {
      secure: process.env.NODE_ENV === 'production' && true,
      sameSite: 'strict',
      maxAge: 86400000
    }
  })
)

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://drspoiler.com']
  })
)

app.use(express.json())

app.use('/', signup)
app.use('/', login)
app.use('/', logout)
app.use('/c', community)
app.use('/c', post)
app.use('/u', user)
app.use('/p', comment)

app.get('/logged', auth, logged)
app.get('/communities', auth, communities)

app.get('/*', (req, res) => {
  res.status(404).send({ error: 'endpoint does not exist' })
})

export default app
