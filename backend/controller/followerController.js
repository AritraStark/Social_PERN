import query from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'

//@route POST /api/followers
//@desc Create new follower relation
//@access Private
export const insertFollower = asyncHandler(async (req, res) => {
    const { id_primary } = req.body
    const id_secondary = req.user.id
    const { rowCount } = await query('SELECT * FROM usersdb WHERE id = $1 OR id = $2', [id_primary, id_secondary])
    if (rowCount == 2 && id_primary != id_secondary) {
        const { rows } = await query('INSERT INTO followersdb (user_id_primary, user_id_secondary) VALUES ($1, $2) RETURNING *', [id_primary, id_secondary])
        res.status(201)
            .json(rows[0])
    }
    else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route GET /api/followers/:id
//@desc Get all followerss
//@access Private
export const getFollowers = asyncHandler(async (req, res) => {
    const id = req.params.id

    const { rowCount } = await query('SELECT * FROM usersdb WHERE id = $1 ', [id])
    if (rowCount == '1') {
        const { rows } = await query('SELECT usersdb.id,name,email,description FROM usersdb INNER JOIN followersdb ON usersdb.id = followersdb.user_id_secondary WHERE user_id_primary = $1', [id])
        res.status(200)
            .json(rows)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route GET /api/followers/following/:id
//@desc Get count of followings
//@access Private
export const getFollowing = asyncHandler(async (req, res) => {
    const id = req.params.id

    const { rowCount } = await query('SELECT * FROM usersdb WHERE id = $1 ', [id])
    if (rowCount == '1') {
        const { rows } = await query('SELECT usersdb.id,name,email,description FROM usersdb INNER JOIN followersdb ON usersdb.id = followersdb.user_id_primary WHERE user_id_secondary = $1', [id])
        res.status(200)
            .json(rows)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route DELETE /api/followers/:id
//@desc Delete follower
//@access Private
export const deleteFollower = asyncHandler(async (req, res) => {
    const { id } = req.user
    const targetId = req.params.id

    const { rowCount } = await query('SELECT * FROM usersdb WHERE id = $1 ', [id])
    if (rowCount == '1') {
        const data = await query('DELETE FROM followersdb WHERE user_id_primary = $1 AND user_id_secondary = $2', [targetId, id])

        res.status(200)
            .json({
                success: true
            })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@route GET /api/followers/
//@desc Get follower
//@access Private
export const getUnfollowedUsers = asyncHandler(async (req, res) => {
    const { id } = req.user

    const { rowCount } = await query('SELECT * FROM usersdb WHERE id = $1 ', [id])
    if (rowCount == '1') {
        const { rows } = await query('SELECT id,name,email,description,url FROM usersdb WHERE id!= $1 EXCEPT SELECT usersdb.id,name,email,description,url FROM usersdb INNER JOIN followersdb ON usersdb.id = followersdb.user_id_primary WHERE user_id_secondary = $1', [id])
        res.status(200)
            .json(rows)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})