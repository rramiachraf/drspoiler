import { Request, Response, NextFunction } from 'express'
import { promisify } from 'util'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { client } from '../redis/client'

const GET = promisify(client.get).bind(client)
const SETEX = promisify(client.setex).bind(client)
const INCR = promisify(client.incr).bind(client)
const TTL = promisify(client.ttl).bind(client)

export default async (req: Request, res: Response, next: NextFunction) => {
  const allowedGETRequestsPerHour = 100
  const allowedOtherRequestsPerHour = 50
  const { method, ip } = req

  try {
    const isBanned = await checkBannedIPS(ip)
    if (isBanned) {
      return res.status(403).send()
    }

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

    if (Number(userRequests) >= 250) {
      await banIP(ip)
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

const bannedIPS_path = join(__dirname, '../../', 'banned.txt')

const checkBannedIPS = (ip: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const bannedIPS = await readFile(bannedIPS_path)
      const bannedIPS_JSON = JSON.parse(String(bannedIPS)) as string[]
      const exists = bannedIPS_JSON.find(bannedIP => bannedIP === ip)
      resolve(!!exists)
    } catch (e) {
      reject(e)
    }
  })
}

const banIP = (ip: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bannedIPS = await readFile(bannedIPS_path)
      const bannedIPS_array = JSON.parse(String(bannedIPS))
      await writeFile(bannedIPS_path, JSON.stringify([...bannedIPS_array, ip]))
      resolve(ip)
    } catch (e) {
      reject(e)
    }
  })
}
