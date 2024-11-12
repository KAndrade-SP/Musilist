import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import spotifyRoutes from './routes/spotifyRoutes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json())

app.use('/api/spotify', spotifyRoutes)

app.use(errorHandler)

export default app
