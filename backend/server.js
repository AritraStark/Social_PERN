import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import followerRoutes from './routes/followerRoutes.js'
import commentRoutes from './routes/commentsRoute.js'

const app = express()
dotenv.config()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/followers', followerRoutes)
app.use('/api/comments', commentRoutes)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`API running in ${ process.env.NODE_ENV } at port ${ PORT }`)
)