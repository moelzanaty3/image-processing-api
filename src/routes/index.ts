import express from 'express'
import imagesRoutes from './api/images'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('hello, world')
})

routes.use('/images', imagesRoutes)

export default routes
