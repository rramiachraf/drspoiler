import { Router } from 'express'
import addPost from './addPost'
import auth from '../../middlewares/auth'
import communityExists from '../../middlewares/communityExists'

const route = Router()

route.post('/', auth, communityExists, addPost)

export default route
