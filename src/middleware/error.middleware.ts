import { Response, Request, NextFunction } from 'express'
import HttpException from '../exceptions/http.exception'

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500
  const message = error.message || 'Whoops!! something went wrong'
  res.status(status).json({ status, message })
}

export default errorMiddleware
