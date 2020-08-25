import { S3 } from 'aws-sdk'
import multer from 'multer'
import S3Storage from 'multer-sharp-s3'
import { AWS_accessKeyId, AWS_secretAccessKey } from '../config'

export const s3 = new S3({
  secretAccessKey: AWS_secretAccessKey,
  accessKeyId: AWS_accessKeyId
})

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
  storage: S3Storage({
    s3,
    Bucket: 'drspoiler-artworks',
    resize: {
      width: 200,
      height: 290
    },
    toFormat: 'jpg',
    ACL: 'public-read',
    Key: (req: any, file: any, cb: any) => {
      const artworkKey = req.params.community.toLowerCase()
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

export const getObject = (
  options: S3.GetObjectRequest
): Promise<S3.GetObjectOutput> => {
  return new Promise((resolve, reject) => {
    s3.getObject(options, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
