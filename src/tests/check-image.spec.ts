import checkIfImagesExist from '../modules/check-image.module'

// create a request object
describe('Test if Image Exist', () => {
  it('expect checkIfImagesExist function defined ', () => {
    expect(checkIfImagesExist).toBeDefined()
  })

  it('expect checkIfImagesExist function to return false with file name image_200_200.jpg ', () => {
    expect(checkIfImagesExist(200, 200, 'image') instanceof Promise).toBe(true)
  })
})
