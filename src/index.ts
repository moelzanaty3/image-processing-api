import app from './app'

const PORT: number = 3000

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
