import mongoose, { Schema, Document } from 'mongoose';

// הגדרת ממשק User
interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,  
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  hasVoted: {
    type: Boolean,
    default: false,  
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
