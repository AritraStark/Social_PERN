import express from 'express'
import { deleteFollower, getFollowers, getFollowersCount, getFollowingCount, insertFollower } from '../controller/followerController.js'
import authM from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authM, insertFollower)
router.route('/:id').get(authM, getFollowers).delete(authM, deleteFollower)
router.get('/count/:id', authM, getFollowersCount)
router.get('/following/:id', authM, getFollowingCount)

export default router