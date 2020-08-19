import { Router } from 'express'
import profile from './profile'
import postsByUser from './posts'

const route = Router()

route.get('/:username', profile)
route.get('/:username/posts', postsByUser)

export default route
