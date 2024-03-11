import express from 'express'
import { requiresLogin } from '../../middleware/auth.js'
import {  bookDriver,bookingList} from './controller.book.js'

const router=express.Router()


router.post('/driver',requiresLogin,bookDriver)
router.get('/list',requiresLogin,bookingList)


export default router