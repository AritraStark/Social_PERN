import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import followerRoutes from './routes/followerRoutes.js'
import commentRoutes from './routes/commentsRoute.js'
import likesRoutes from './routes/likesRoutes.js'


const app = express()
dotenv.config()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/followers', followerRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likesRoutes)

const __dirname = path.resolve()

//This is checking if the app is in production mode or development mode and serving the static HTML file if any endpoint other than the ones mentioned above is hit
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`API running in ${ process.env.NODE_ENV } at port ${ PORT }`)
)