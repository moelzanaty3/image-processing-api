import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

import routes from './routes'
import errorMiddleware from './middleware/error.middleware'

// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
// HTTP security middleware headers
app.use(helmet())
// add routing for /api path
app.use('/api', routes)
// error handler middleware
app.use(errorMiddleware)

export default app
