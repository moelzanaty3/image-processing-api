import { Request, Response, Router } from 'express'
import sharp from 'sharp'
import fs from 'fs-extra'
import { query, validationResult, ValidationError } from 'express-validator'
import { IMAGES, IMAGE_DIR_PATH, IMAGE_OUTPUT_DIR_PATH } from '../../constants'

const routes = Router()

routes.get(
  '/',
  [
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
  ],
  async (req: Request, res: Response) => {
    // format error message
    const errorFormatter = ({ msg, param }: ValidationError) => `[${param}]: ${msg}`
    const errors = validationResult(req).formatWith(errorFormatter)
    // check if there's any error exists, return with errors
    if (!errors.isEmpty()) {
      res
        .status(422)
        .json({ status: 'Error', errors: errors.array({ onlyFirstError: true }) })
        .end()
    }
    // get query parameters
    const { width, height, filename } = req.query
    const originalImagePath = `${IMAGE_DIR_PATH}/${filename}.jpg`
    const outputImagePath = `${IMAGE_OUTPUT_DIR_PATH}/${filename}_${width}_${height}.jpg`
    // check if the image exists or not
    try {
      // check if the folder thumbnails exists, if not create it.
      await fs.ensureDir(IMAGE_OUTPUT_DIR_PATH)
      // Test whether or not the given path exists by checking with the file system.
      const isProcessedImageExists: boolean = await fs.pathExists(outputImagePath)
      // check if exist return if not process the image with target configuration
      if (!isProcessedImageExists) {
        // resize image to target #{width}, #{height} and export it to thumbnails folder
        await sharp(originalImagePath).resize(Number(width), Number(height)).toFile(outputImagePath)
      }
      // file exists so you don't need to process image again
      // open image from thumbnails  as a readable stream
      const readStream = fs.createReadStream(outputImagePath)
      // This will wait until we know the readable stream is actually valid before piping
      readStream.on('open', () => {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res)
      })
      // This catches any errors that happen while creating the readable stream (usually invalid names)
      readStream.on('error', (err) => {
        res.end(err)
      })
    } catch (error) {
      throw new Error(`Error ${error.message}`)
    }
  }
)

export default routes
