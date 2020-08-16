import { Router, Request, Response } from 'express'
import auth from '../middlewares/auth'

const route = Router()

route.post('/logout', auth, async (req: Request, res: Response) => {
  req.session?.destroy(err => {
    if (err) {
      res.status(500).send()
    }
    res.send()
  })
})

export default route
