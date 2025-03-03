import mongoose from 'mongoose';

interface Admin extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const AdminSchema = new mongoose.Schema<Admin>({
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

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
