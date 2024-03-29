import express from 'express'
import { getUsers, userReg } from '../controllers/user.controller'

const router = express.Router()

// Define routes
router.get('/user', getUsers)
router.post('/user', userReg)

// Export the router
export default router
