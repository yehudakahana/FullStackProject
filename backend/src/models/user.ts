import mongoose, { Schema, Document } from 'mongoose';

// הגדרת ממשק User
export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  voteFor: mongoose.Types.ObjectId | null;
  
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
  voteFor: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    default: null,  
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
