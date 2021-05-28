import { Request, Response, Router } from 'express'
import resizeController from '../../controllers/resize.controllers'
import {
  validateMiddleware,
  imagePreviewValidationRules,
  imageResizeValidationRules
} from '../../middleware/validator.middleware'
import checkIfImagesExist from '../../modules/check-image.module'

const routes = Router()

routes.get(
  '/resize',
  imageResizeValidationRules(),
  validateMiddleware,
  async (req: Request, res: Response) => {
    // get query parameters
    const width: number = parseInt(req.query.width as string, 10)
    const height: number = parseInt(req.query.height as string, 10)
    const filename: string = req.query.filename as string
    try {
      // check if the image exists or not
      const isImageExist = await checkIfImagesExist(width, height, filename)
      // check if exist return if not process the image with target configuration
      if (!isImageExist) {
        // resize image to target #{width}, #{height} and export it to thumbnails folder
        await resizeController(width, height, filename)
      }
      res.render('resize', {
        width,
        height,
        thumbnail: `${filename}_${width}_${height}.jpg`
      })
    } catch (error) {
      throw new Error(`Error ${error.message}`)
    }
  }
)

routes.get(
  '/preview',
  imagePreviewValidationRules(),
  validateMiddleware,
  async (req: Request, res: Response) => {
    // get query parameters
    const filename: string = req.query.filename as string
    try {
      res.render('index', {
        thumbnail: `${filename}.jpg`
      })
    } catch (error) {
      throw new Error(`Error ${error.message}`)
    }
  }
)

export default routes
