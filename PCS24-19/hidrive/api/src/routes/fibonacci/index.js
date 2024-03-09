import express from 'express'
import { fibonacci } from './controller.fibonacci.js'

const router=express.Router()


router.get('/:num',fibonacci)

export default router