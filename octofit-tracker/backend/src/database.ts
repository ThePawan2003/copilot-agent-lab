import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
}

export default connectDatabase;