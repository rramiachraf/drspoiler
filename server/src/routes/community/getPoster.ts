import { Request, Response } from 'express'
import { getObject } from '../../aws/upload'
import { Bucket } from '../../config'

const getPoster = async (req: Request, res: Response) => {
  try {
    const { Body } = await getObject({
      Key: req.params.community.toLowerCase(),
      Bucket
    })
    res.setHeader('content-type', 'image/jpg')
    res.send(Body)
  } catch (e) {
    console.log(e)
    res.status(404).send()
  }
}

export default getPoster
