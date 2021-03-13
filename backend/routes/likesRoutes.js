import express from 'express'
import authM from '../middleware/authMiddleware.js'
import { insertLike, checkLike, getLikesCount, deleteLike } from '../controller/likesController.js'

const router = express.Router()

router.use('/:id').post(authM, insertLike).get(authM, getLikesCount).delete(authM, deleteLike)
router.get('/post/:id', authM, checkLike)

export default router