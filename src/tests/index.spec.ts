import supertest from 'supertest'
import fs from 'fs'
import { IMAGE_OUTPUT_DIR_PATH } from '../constants'
import app from '../app'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('Gets the api/images endpoint', async () => {
    const response = await request.get('/api/images?filename=palmtunnel&width=200&height=200')
    expect(response.status).toBe(200)
  })
  it('Images by second time properties should exist', () => {
    expect(fs.existsSync(`${IMAGE_OUTPUT_DIR_PATH}/palmtunnel_200_200.jpg`)).toBeTruthy()
  })
  it('Images by first time properties should not be exist', () => {
    expect(fs.existsSync(`${IMAGE_OUTPUT_DIR_PATH}/palmtunnel_500_500.jpg`)).toBeFalsy()
  })
})
