import { Router } from 'express'
import addPost from './addPost'
import getPost from './getPost'
import getPosts from './getPosts'
import updatePost from './updatePost'
import deletePost from './deletePost'
import auth from '../../middlewares/auth'
import communityExists from '../../middlewares/communityExists'

const route = Router()

route.post('/:community/p/', auth, communityExists, addPost)
route.get('/:community/p/:postId', getPost)
route.get('/:community/posts', communityExists, getPosts)
route.patch('/:community/p/:postId', auth, communityExists, updatePost)
route.delete('/:community/p/:postId', auth, communityExists, deletePost)

export default route
