import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI:string | undefined = process.env.MONGO_URI
    
    if(!MONGO_URI){
      throw new Error("Can't connect to DB")
    }
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  }
};

export default connectDB;
