import express from 'express'
import imagesRoutes from './api/images'

const routes = express.Router()

routes.use('/images', imagesRoutes)

export default routes
