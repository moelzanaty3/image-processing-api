import { Response, Request } from 'express'
import HttpException from '../exceptions/http.exception'

const errorMiddleware = (error: HttpException, req: Request, res: Response) => {
  const status = error.status || 500
  const message = error.message || 'Whoops!! something went wrong'
  res.status(status).json({ status, message })
}

export default errorMiddleware
