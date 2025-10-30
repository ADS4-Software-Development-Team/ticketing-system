import express from 'express'
import { testSupabaseConnection } from './config/db.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Server is running ✅')
})

testSupabaseConnection()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
