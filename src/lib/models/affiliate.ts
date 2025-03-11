import mongoose from 'mongoose';

interface Affiliate extends Document {
  username: string;
  password: string;
  createdAt: Date;
  total_refers: number;
  success_refers: number;
  refs: string[];
}

const AffiliateSchema = new mongoose.Schema<Affiliate>({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    total_refers: {
        type: Number,
        default: 0
    },
    success_refers: {
        type: Number,
        default: 0
    },
    refs: {
        type: [String],
        default: []
    }
}, { timestamps: true });

export default mongoose.models.Affiliate || mongoose.model('Affiliate', AffiliateSchema);
