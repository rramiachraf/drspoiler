import { Request, Response } from 'express'

const logged = async (req: Request, res: Response) => {
  res.send({ userId: req.session!.userId })
}

export default logged
