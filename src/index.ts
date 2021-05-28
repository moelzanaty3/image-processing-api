import * as dotenv from 'dotenv'
import app from './app'

dotenv.config()
const PORT = process.env.PORT || 3000

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
