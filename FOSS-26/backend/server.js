const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const { MongoMemoryServer } = require('mongodb-memory-server')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('CodeQuest API is running!')
})

// Connect to MongoDB
async function startServer() {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  
  await mongoose.connect(uri)
  console.log('MongoDB connected (in-memory)')
  
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  })
}

startServer().catch(console.error)