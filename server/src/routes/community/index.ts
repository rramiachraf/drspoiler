import { Router } from 'express'
import createCommunity from './createCommunity'
import viewCommunity from './viewCommunity'
import updatePoster from './updatePoster'
import deleteCommunity from './deleteCommunity'
import getPoster from './getPoster'
import auth from '../../middlewares/auth'
import communityExists from '../../middlewares/communityExists'

const route = Router()

route.post('/', auth, createCommunity)

route.get('/:community', viewCommunity)

route.patch('/:community/update_poster', auth, communityExists, updatePoster)

route.delete('/:community', auth, communityExists, deleteCommunity)

route.get('/:community/poster', getPoster)

export default route
