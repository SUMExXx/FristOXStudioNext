import { Schema, Document, model } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  plan: string;
  createdAt: Date;
}

const UserSchema = new Schema<User>({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    plan: { 
        type: String, 
        required: true, 
        enum: ['free', 'premium', 'enterprise'],
        default: 'free' 
    },
}, { timestamps: true });

const User = model<User>('User', UserSchema);

export default User
