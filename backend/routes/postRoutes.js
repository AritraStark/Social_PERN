import express from 'express'
import { createPost, updatePost, deletePost, getUserPosts, getFollowerPosts, getPost } from '../controller/postController.js'
import authM from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authM, createPost)
router.route('/:id').get(authM, getPost).post(authM, updatePost).delete(authM, deletePost)
router.get('/individual/:id', authM, getUserPosts)
router.get('/', authM, getFollowerPosts)

export default router