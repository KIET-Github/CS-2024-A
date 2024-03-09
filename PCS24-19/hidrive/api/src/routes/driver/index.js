import express from 'express'
import { requiresLogin } from '../../middleware/auth.js'
import { deleteDriver, getDriver, updateDriver, getDriverList, addDriver} from './controller.driver.js'

const router=express.Router()

router.post('/',requiresLogin,getDriver)
router.post('/add',addDriver)
router.get('/list',getDriverList)
router.put('/',requiresLogin,updateDriver)
router.delete('/',requiresLogin,deleteDriver)

export default router