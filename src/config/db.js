import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
let connected = false;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (connected) {
    console.log('Already connected to database!');
    return;
  }
  try {
    await mongoose.connect(uri);
    connected = true;
    console.log('Connection to database successful!');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};

export default connectDB;
