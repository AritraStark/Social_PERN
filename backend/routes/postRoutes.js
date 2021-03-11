import express from 'express'
import { createPost, updatePost, deletePost, getUserPosts } from '../controller/postController.js'
import authM from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authM, createPost)
router.route('/:id').post(authM, updatePost).delete(authM, deletePost)
router.get('/individual/:id', authM, getUserPosts)

export default router