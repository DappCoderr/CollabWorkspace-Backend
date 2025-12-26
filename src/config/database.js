import mongoose from 'mongoose';
import { MONGODB_URI } from './serverConfig.js';

const connectDB = async () => {
  try {
    const mongoUri = MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error:', error.message);
  }
};

export { connectDB, disconnectDB };
