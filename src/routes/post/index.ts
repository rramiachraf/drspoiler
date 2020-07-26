import { Router } from 'express'
import addPost from './addPost'
import getPost from './getPost'
import getPosts from './getPosts'
import deletePost from './deletePost'
import auth from '../../middlewares/auth'
import communityExists from '../../middlewares/communityExists'

const route = Router()

route.post('/:community/p/', auth, communityExists, addPost)
route.get('/:community/p/:postId', getPost)
route.get('/:community/posts', communityExists, getPosts)
route.delete('/:community/p/:postId', auth, communityExists, deletePost)

export default route
