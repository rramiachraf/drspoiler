import { Router } from 'express'
import profile from './profile'
import postsByUser from './posts'
import settings from './settings'
import updateInfo from './updateInfo'
import updatePassword from './updatePassword'
import auth from '../../middlewares/auth'

const route = Router()

route.get('/settings', auth, settings)
route.patch('/settings', auth, updateInfo)
route.patch('/update_password', auth, updatePassword)
route.get('/:username', profile)
route.get('/:username/posts', postsByUser)

export default route
