import query from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'
import { hash, checkPass } from '../utils/genHash.js'
import genToken from '../utils/genToken.js'

//@route POST /api/users
//@desc Create new user
//@access Public
export const createUser = asyncHandler(async (req, res) => {
    //Extracting values from body of request
    const { name, email, description, password, url, file_name } = req.body
    //Hadshing password
    const hPass = await hash(password)

    //Checking for existing user in database
    const { rowCount } = await query('SELECT * FROM usersdb WHERE email = $1', [email])
    if (rowCount == '0') {
        try {
            //Inserting into database and fetching response
            const { rows } = await query('INSERT INTO usersdb (name, email, description, password, url, file_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, email, description, hPass, url, file_name])
            const token = await genToken(rows[0].id)
            const user = rows[0]
            //Sending json response
            res.status(201).json({ user, token })
        } catch (error) {
            res.status(400)
            throw new Error('Invalid data')
        }
    } else {
        res.status(400)
        throw new Error('User already exists')
    }
})

//@route POST /api/users/login
//@desc Login user
//@access Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const { rows } = await query('SELECT * FROM usersdb WHERE email = $1', [email])
        const check = await checkPass(password, rows[0].password)

        if (check) {
            const token = await genToken(rows[0].id)
            const user = rows[0]
            //Sending json response
            res.status(201).json({ user, token })
        }
        else {
            res.status(400)
            throw new Error('Inavlid credentials')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Inavlid credentials')
    }

})

//@route POST /api/users/:id
//@desc Update user
//@access Private
export const updateUser = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const id = req.params.id

    const { rows } = await query('UPDATE usersdb SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id])

    if (rows[0]) {
        res.status(200)
            .json(rows[0])
    }
    else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

//@route DELETE /api/users/:id
//@desc Delete user
//@access Private
export const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const data = await query('DELETE FROM usersdb WHERE id = $1', [id])
        res.status(200)
            .json({
                success: true
            })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route GET /api/users
//@desc Get users
//@access Public
export const getUsers = asyncHandler(async (req, res) => {
    try {
        const { rows } = await query('SELECT * from usersdb')
        console.log(rows)
        res.status(200)
            .json(rows)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//@route GET /api/users/;id
//@desc Get user details
//@access Public
export const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const { rows } = await query('SELECT * from usersdb WHERE id = $1', [id])
        res.status(200)
            .json(rows[0])
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})