import express from 'express'
import authM from '../middleware/authMiddleware.js'
import { createUser, updateUser, deleteUser, loginUser, getUsers, getUser } from '../controller/userController.js'

const router = express.Router()

router.post('/login', loginUser)
router.route('/').post(createUser).get(getUsers)
router.route('/:id').get(authM, getUser).post(authM, updateUser).delete(authM, deleteUser)

export default router