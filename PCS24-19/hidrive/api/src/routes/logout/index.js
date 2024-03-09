import express from 'express'
import { logout} from './controller.logout.js'

const router=express.Router()

router.post('/',logout)

export default router