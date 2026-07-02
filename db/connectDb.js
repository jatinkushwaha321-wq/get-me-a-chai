import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/chai`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
}
export default connectDB;