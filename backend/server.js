import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config()

app.use(express.json())

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`API running in ${ process.env.NODE_ENV } at port ${ PORT }`)
)