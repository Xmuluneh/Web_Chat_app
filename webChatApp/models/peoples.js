import mongoose from 'mongoose';

const peopleSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: Number, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true },
    password: { type: string, required: true },
    avatar: { type: String },
    role: { type: string, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamp: true }
);

const People = mongoose.model('People', peopleSchema);
export default People;
