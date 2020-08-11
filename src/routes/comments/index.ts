import { Router } from 'express'
import auth from '../../middlewares/auth'
import addComment from './addComment'
import getComments from './getComments'
import removeComment from './removeComment'

const route = Router()

route.post('/:postId/comment', auth, addComment)
route.get('/:postId/comments', getComments)
route.delete('/:postId/comment/:commentId', auth, removeComment)

export default route
