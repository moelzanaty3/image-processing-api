import fs from 'fs-extra'
import { IMAGE_OUTPUT_DIR_PATH } from '../constants'

const checkIfImagesExist = async (
  width: number,
  height: number,
  filename: string
): Promise<boolean> => {
  const outputImagePath = `${IMAGE_OUTPUT_DIR_PATH}/${filename}_${width}_${height}.jpg`
  console.log(outputImagePath)
  try {
    // check if the folder thumbnails exists, if not create it.
    await fs.ensureDir(IMAGE_OUTPUT_DIR_PATH)
    // Test whether or not the given path exists by checking with the file system.
    const isProcessedImageExists: boolean = await fs.pathExists(outputImagePath)
    return isProcessedImageExists
  } catch (error) {
    throw new Error('File not exists in the output folder')
  }
}

export default checkIfImagesExist
