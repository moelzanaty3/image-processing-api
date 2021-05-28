import app from './app'
import { PORT } from './constants'

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
