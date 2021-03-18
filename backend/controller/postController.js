import query from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'

//@route POST /api/posts
//@desc Create new post
//@access Private
export const createPost = asyncHandler(async (req, res) => {
    //Extracting values from body of request
    const { title, body, url, file_name } = req.body
    //Getting id of user from auth middleware
    const { id, name } = req.user
    const user_url = req.user.url
    // const user = await query('SELECT name FROM usersdb WHERE id = $1', [id])
    // const user_name = user.rows.name
    try {
        //Inserting into database and fetching response

        const { rows } = await query('INSERT INTO postsdb (user_id, title, body, url, file_name, user_name, user_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [id, title, body, url, file_name, user_name, user_url])

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

//@route GET /api/posts/follow
//@desc Get follower posts
//@access Private
export const getFollowingPosts = asyncHandler(async (req, res) => {
    const { id } = req.user

    const { rows } = await query('SELECT postsdb.id, title, body, url, user_id, user_name, user_url FROM postsdb INNER JOIN followersdb ON postsdb.user_id = followersdb.user_id_primary WHERE followersdb.user_id_secondary = $1', [id])

    try {
        res.status(200)
            .json(rows)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route GET /api/posts/:id
//@desc Get post
//@access Private
export const getPost = asyncHandler(async (req, res) => {
    const id = req.params.id

    const { rows } = await query('SELECT * FROM postsdb WHERE id = $1', [id])

    try {
        res.status(200)
            .json(rows[0])
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})