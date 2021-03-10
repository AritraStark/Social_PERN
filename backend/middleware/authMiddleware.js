import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import query from '../db/postGresPool.js'

const authM = asyncHandler(async (req, res, next) => {
    let token = req.headers['x-auth']

    if (token) {
        try {
            //Decoding the jwt token and requiring the payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //Querying the database to find the user of the token
            const { rows } = await query('SELECT * FROM usersdb WHERE id = $1', [decoded.id])
            console.log('Authenticated')
            //Setting the user in request for further use
            req.user = rows[0]
            next()
        } catch (error) {
            res.status(401)
            console.log(error)
            throw new Error('Token Invalid')
        }
    }
    else {
        res.status(401)
        throw new Error('No Token')
    }
})

export default authM