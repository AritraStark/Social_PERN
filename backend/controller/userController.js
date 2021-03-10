import { query } from '../db/postGresPool.js'
import asyncHandler from 'express-async-handler'
import { hash, checkPass } from '../utils/genHash.js'

//@route POST /api/users
//@desc Create new user
//@access Public
export const createUser = asyncHandler(async (req, res) => {
    //Extracting values from body of request
    const { name, email, password } = req.body

    //Checking for existing user in database
    const check = query('SELECT EXISTS(SELECT * FROM userdb WHERE email = $1)', [email])

    if (check.row != 0) {
        res.status(400)
        throw new Error('User already exists')
    }

    try {
        //Inserting into database and fetching response
        const { row } = await query('INSERT INTO userdb (name,email,password) VALUES $1,$2,$3', [name, email, hash(password)])

        //Sending json response
        res.status(201).json(row)
    } catch (error) {
        res.status(400)
        throw new Error('Invalid data')
    }
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const { row } = query('SELECT * FROM userdb WHERE email = $1', [email])

    if (row[0] && checkPass(password, row[0].password)) {
        res.status(200)
            .json(row[0])
    }
    else {
        res.json(400)
        throw new Error('Iavlid credentials')
    }

})