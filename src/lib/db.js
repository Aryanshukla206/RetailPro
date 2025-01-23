import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

const MONGODB_URI = 'mongodb://localhost:27017/nighwan';
// process.env.MONGODB_URI  ||
export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
}