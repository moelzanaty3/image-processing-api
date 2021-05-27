import express, { Application } from 'express'
import morgan from 'morgan'

import routes from './routes'
import errorMiddleware from './middleware/error.middleware'

// create an instance server
const app: Application = express()

// HTTP request logger middleware
app.use(morgan('short'))
// error handler middleware
app.use(errorMiddleware)

app.use('/api', routes)

export default app
