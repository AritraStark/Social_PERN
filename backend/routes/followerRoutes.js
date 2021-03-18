import express from 'express'
import { deleteFollower, getFollowers, getFollowing, getUnfollowedUsers, insertFollower } from '../controller/followerController.js'
import authM from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(authM, insertFollower).get(authM, getUnfollowedUsers)
router.route('/:id').get(authM, getFollowers).delete(authM, deleteFollower)
router.get('/following/:id', authM, getFollowing)

export default router