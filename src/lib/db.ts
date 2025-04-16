import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env.local')
}

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'finance', // optional, for clarity
    })
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
