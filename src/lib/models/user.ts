import mongoose from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<User>({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
