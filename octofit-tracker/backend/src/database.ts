import mongoose from 'mongoose'

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectDatabase() {
  return mongoose.connect(mongoUri)
}

export default connectDatabase
