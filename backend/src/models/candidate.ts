import mongoose, { Schema, Document } from 'mongoose';


interface ICandidate extends Document {
  name: string;
  image: string;
  votes: number;
}

const candidateSchema = new Schema<ICandidate>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,  
  },
  votes: {
    type: Number,
    default: 0,  
  },
});

const Candidate = mongoose.model<ICandidate>('Candidate', candidateSchema);

export default Candidate;
