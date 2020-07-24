import { Router } from 'express'
import addPost from './addPost'
import getPost from './getPost'
import auth from '../../middlewares/auth'
import communityExists from '../../middlewares/communityExists'

const route = Router()

route.post('/', auth, communityExists, addPost)
route.get('/:postId', getPost)

export default route
