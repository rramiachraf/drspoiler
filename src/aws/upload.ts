import { config, S3 } from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { extname } from 'path'
import { AWS_accessKeyId, AWS_secretAccessKey } from '../config'
import pool from '../database'

config.update({
  secretAccessKey: AWS_secretAccessKey,
  accessKeyId: AWS_accessKeyId,
  region: 'us-east-1'
})

export const s3 = new S3()

export const uploadArtwork = multer({
  fileFilter: async (req, { originalname }, cb) => {
    // TODO check if the community exist
    // TODO check if the current user is the communiy administrator
    const format = /\.(jpeg|jpg|png)$/
    if (!format.test(originalname)) {
      cb(new Error("Images must be ('png', 'jpg', 'jpeg')"))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 1000000,
    files: 1
  },
  storage: multerS3({
    s3,
    bucket: 'drspoiler-artworks',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, { originalname }, cb) => {
      //@ts-ignore
      const artworkKey = req.body.work + extname(originalname)
      req.artworkKey = artworkKey
      cb(null, artworkKey)
    }
  })
})
