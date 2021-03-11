import query from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'

//@route POST /api/comments
//@desc Create new comment
//@access Private
export const insertComment = asyncHandler(async (req, res) => {
    const { post_id, body } = req.body
    const { id, name } = req.user

    try {
        const { rows } = await query('INSERT INTO commentsdb (post_id, user_id, user_name, body) VALUES ($1, $2, $3, $4) RETURNING *', [post_id, id, name, body])
        res.status(201)
            .json(rows[0])
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route GET /api/comments/:id
//@desc Get all comments for a post
//@access Private
export const getComments = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const { rows } = await query('SELECT * FROM commentsdb WHERE post_id = $1', [id])
        res.status(200)
            .json(rows)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route POST /api/comments/:id
//@desc Update post
//@access Private
export const updateComment = asyncHandler(async (req, res) => {
    const { body } = req.body
    const id = req.params.id

    const { rows } = await query('UPDATE commentsdb SET body = $2 WHERE id = $1 RETURNING *', [id, body])

    if (rows[0]) {
        res.status(200)
            .json(rows[0])
    }
    else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

//@route DELETE /api/comments/:id
//@desc DELETE comment
//@access Private
export const deleteComment = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const data = await query('DELETE FROM commentsdb WHERE id = $1', [id])
        res.status(200)
            .json({
                success: true
            })
    } catch (error) {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route DELETE /api/comments/post/:id
//@desc DELETE comments of a post
//@access Private
export const deleteCommentsPost = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const data = await query('DELETE FROM commentsdb WHERE post_id = $1', [id])
        res.status(200)
            .json({
                success: true
            })
    } catch (error) {
        res.status(400)
        throw new Error('Invalid data')
    }
})