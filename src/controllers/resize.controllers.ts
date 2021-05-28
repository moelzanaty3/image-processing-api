import sharp from 'sharp'
import { IMAGE_OUTPUT_DIR_PATH, IMAGE_DIR_PATH } from '../constants'

const resizeController = async (width: number, height: number, filename: string): Promise<void> => {
  const originalImagePath = `${IMAGE_DIR_PATH}/${filename}.jpg`
  const outputImagePath = `${IMAGE_OUTPUT_DIR_PATH}/${filename}_${width}_${height}.jpg`
  try {
    await sharp(originalImagePath).resize(Number(width), Number(height)).toFile(outputImagePath)
  } catch (error) {
    throw new Error('Error occurred while processing image')
  }
}

export default resizeController
