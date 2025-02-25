import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || '';

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable');
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(MONGODB_URL);
};

export default connectDB;
