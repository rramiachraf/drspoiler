import { config, S3 } from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { extname } from 'path'
import { AWS_accessKeyId, AWS_secretAccessKey } from '../config'

config.update({
  secretAccessKey: AWS_secretAccessKey,
  accessKeyId: AWS_accessKeyId,
  region: 'us-east-1'
})

export const s3 = new S3()

export const uploadArtwork = multer({
  fileFilter: (req, { originalname }, cb) => {
    // TODO check if the current user is the community administrator
    const format = /\.(jpeg|jpg|png)$/
    if (!format.test(originalname)) {
      cb(null, false)
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
      const artworkKey = req.params.community + extname(originalname)
      req.artworkKey = artworkKey
      cb(null, artworkKey)
    }
  })
})

export const deleteObject = (options: S3.DeleteObjectRequest) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject(options, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
