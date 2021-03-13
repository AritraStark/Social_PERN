import query from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'

//@route POST /api/likes/:id
//@desc Create like
//@access Private
export const insertLike = asyncHandler(async (req, res) => {
    const post_id = req.params.id
    const { id } = req.user

    try {
        const { rows } = await query('INSERT INTO likesdb (post_id, user_id) VALUES ($1, $2) RETURNING *', [post_id, id])
        res.status(201)
            .json(rows[0])
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route GET /api/likes/post/:id
//@desc Get all like status for a post
//@access Private
export const checkLike = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user_id = req.user.id
    try {
        const { rowCount } = await query('SELECT * FROM commentsdb WHERE post_id = $1 AND user_id = $2', [id, user_id])
        res.status(200)
            .json(rowCount)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


//@route DELETE /api/likes/:id
//@desc DELETE comment
//@access Private
export const deleteLike = asyncHandler(async (req, res) => {
    const post_id = req.params.id
    const { id } = req.user
    try {
        const data = await query('DELETE FROM commentsdb WHERE post_id = $1 , user_id = $2', [id, user_id])
        res.status(200)
            .json({
                success: true
            })
    } catch (error) {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route GET /api/likes/:id
//@desc GET likes count of a post
//@access Private
export const getLikesCount = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const { rows } = await query('SELECT COUNT(id) FROM likesdb WHERE post_id = $1', [id])
        res.status(200)
            .json(rows)
    } catch (error) {
        res.status(400)
        throw new Error('Invalid data')
    }
})