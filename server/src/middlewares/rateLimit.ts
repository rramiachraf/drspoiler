import { Request, Response, NextFunction } from 'express'
import { promisify } from 'util'
import { client } from '../redis/client'

const GET = promisify(client.get).bind(client)
const SETEX = promisify(client.setex).bind(client)
const INCR = promisify(client.incr).bind(client)
const TTL = promisify(client.ttl).bind(client)

export default async (req: Request, res: Response, next: NextFunction) => {
  // TODO if a user commits more than a 500 hundred requests within an hour, his ip gets banned
  const allowedGETRequestsPerHour = 100
  const allowedOtherRequestsPerHour = 50
  const { method, ip } = req

  try {
    const userRequests = await GET(ip)

    if (userRequests === null) {
      await SETEX(ip, 3600, '1')
      return next()
    }

    await INCR(ip)

    if (Number(userRequests) < allowedGETRequestsPerHour && method === 'GET') {
      return next()
    }

    if (
      Number(userRequests) < allowedOtherRequestsPerHour &&
      method !== 'GET'
    ) {
      return next()
    }

    const remainingSeconds = await TTL(ip)
    const retryAfter = new Date(Date.now() + remainingSeconds * 1000)

    res.setHeader('Retry-After', String(retryAfter))
    res.status(429).send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
}
