import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/userRoutes'
import userAuthRoutes from './routes/authRoutes'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { authenticateCookie } from './middleware/cookieAuth'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(authenticateCookie)

app.use('/', userRoutes)
app.use('/', userAuthRoutes)

app.use(errorHandlerMiddleware)

export default app