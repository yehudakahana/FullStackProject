import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
  
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/election-app');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  }
};

export default connectDB;
