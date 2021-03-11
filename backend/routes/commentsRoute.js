import express from 'express'
import { deleteComment, deleteCommentsPost, getComments, insertComment, updateComment } from '../controller/commentsController.js'
import authM from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authM, insertComment)
router.route('/:id').get(authM, getComments).post(authM, updateComment).delete(authM, deleteComment)
router.delete('/post/:id', authM, deleteCommentsPost)

export default router