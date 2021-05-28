import path from 'path'

// array of existing images in server
const IMAGES: string[] = ['fjord', 'encenadaport', 'palmtunnel', 'santamonica', 'icelandwaterfall']
// image directory path
const IMAGE_DIR_PATH: string = path.resolve(__dirname, '../public/images/high-quality')
const IMAGE_OUTPUT_DIR_PATH: string = path.resolve(__dirname, '../public/images/thumbnails')

export { IMAGES, IMAGE_DIR_PATH, IMAGE_OUTPUT_DIR_PATH }
