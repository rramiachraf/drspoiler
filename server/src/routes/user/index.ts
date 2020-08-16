import { Router } from 'express'
import profile from './profile'

const route = Router()

route.get('/:username', profile)

export default route
