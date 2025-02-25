import mongoose, { Schema, Document } from 'mongoose';

interface IUnverifiedUser extends Document {
  email: string;
  hashedPassword: string;
  createdAt: Date;
}

const UnverifiedUserSchema = new Schema<IUnverifiedUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h', // Automatically delete after 24 hours
  },
});

const UnverifiedUser = mongoose.models.UnverifiedUser || mongoose.model<IUnverifiedUser>('UnverifiedUser', UnverifiedUserSchema);

export default UnverifiedUser;