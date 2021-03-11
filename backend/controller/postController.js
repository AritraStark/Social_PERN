import query from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'

//@route POST /api/posts
//@desc Create new post
//@access Private
export const createPost = asyncHandler(async (req, res) => {
    //Extracting values from body of request
    const { title, body, url } = req.body
    //Getting id of user from auth middleware
    const { id } = req.user
    try {
        //Inserting into database and fetching response
        const { rows } = await query('INSERT INTO postsdb (user_id, title, body,url) VALUES ($1, $2, $3,$4) RETURNING *', [id, title, body, url])

        //Sending json response
        res.status(201).json(rows[0])
    } catch (error) {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route POST /api/posts/:id
//@desc Update post
//@access Private
export const updatePost = asyncHandler(async (req, res) => {
    const { title, body } = req.body
    const id = req.params.id

    const { rows } = await query('UPDATE postsdb SET title = $2, body = $3 WHERE id = $1 RETURNING *', [id, title, body])

    if (rows[0]) {
        res.status(200)
            .json(rows[0])
    }
    else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

//@route DELETE /api/posts/:id
//@desc Delete post
//@access Private
export const deletePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const data = await query('DELETE FROM postsdb WHERE id = $1', [id])
        res.status(200)
            .json({
                success: true
            })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route GET /api/posts/individual/:id
//@desc Get posts
//@access Public
export const getUserPosts = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const { rows } = await query('SELECT * FROM postsdb WHERE user_id = $1', [id])
        res.status(200)
            .json(rows)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
