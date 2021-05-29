import express, { Application } from 'express'
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'

import routes from './routes'
import errorMiddleware from './middleware/error.middleware'

// create an instance server
const app: Application = express()
// add middleware to for static files
app.use('/images', express.static(path.join(__dirname, 'images')))
// set up template engine and set the directory
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
// HTTP request logger middleware
app.use(morgan('short'))
// HTTP security middleware headers
app.use(helmet())

// add routing for /api path
app.use('/api', routes)
// error handler middleware
app.use(errorMiddleware)

export default app
