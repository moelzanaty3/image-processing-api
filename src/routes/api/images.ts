import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({
    status: 'Success',
    message: 'Hello from main api images route'
  })
})

export default routes
