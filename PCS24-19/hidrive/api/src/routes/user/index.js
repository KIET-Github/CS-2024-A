import express from 'express'
import { requiresLogin } from '../../middleware/auth.js'
import { deleteUser, getUser, updateUser} from './controller.user.js'

const router=express.Router()

router.get('/',requiresLogin,getUser)
router.put('/',requiresLogin,updateUser)
router.delete('/',requiresLogin,deleteUser)

export default router