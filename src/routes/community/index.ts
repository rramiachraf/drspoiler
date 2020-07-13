import { Router } from 'express'
import auth from '../../middlewares/auth'
import { uploadArtwork } from '../../aws/upload'
import createCommunity from '../community/createCommunity'
import viewCommunity from '../community/viewCommunity'
import updatePoster from '../community/updatePoster'

const route = Router()

route.post('/', auth, createCommunity)

route.get('/:community', viewCommunity)

route.patch(
  '/update_poster',
  auth,
  uploadArtwork.single('poster'),
  updatePoster
)

export default route
