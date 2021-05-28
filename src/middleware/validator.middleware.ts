import { Response, Request, NextFunction } from 'express'
import { query, validationResult, ValidationError } from 'express-validator'
import { IMAGES } from '../constants'

const imageResizeValidationRules = () => [
  query('width')
    .exists()
    .withMessage('Image width is required')
    .toInt()
    .isInt({ max: 1000 })
    .withMessage('The max width should be 1000'),
  query('height')
    .exists()
    .withMessage('Image height is required')
    .toInt()
    .isInt({ max: 1000 })
    .withMessage('The max height should be 1000'),
  query('filename')
    .exists()
    .withMessage('Image name is required')
    .isIn(IMAGES)
    .withMessage('The image is not exist')
]

const imagePreviewValidationRules = () => [
  query('filename')
    .exists()
    .withMessage('Image name is required')
    .isIn(IMAGES)
    .withMessage('The image is not exist')
]

// eslint-disable-next-line no-unused-vars
const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // format error message
  const errorFormatter = ({ msg, param }: ValidationError) => `[${param}]: ${msg}`
  const errors = validationResult(req).formatWith(errorFormatter)
  // check if there's any error exists
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(422).json({
    status: 'error',
    errors: errors.array({ onlyFirstError: true })
  })
}

export { validateMiddleware, imagePreviewValidationRules, imageResizeValidationRules }
