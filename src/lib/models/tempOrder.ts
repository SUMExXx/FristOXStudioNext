import { Schema, Document, model } from 'mongoose';

interface TempOrder extends Document {
  email: string;
  code: string;
  paymentId: string;
  createdAt: Date;
}

const TempOrderSchema = new Schema<TempOrder>({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    code: { 
        type: String, 
        required: true,
        unique: true,
    },
    paymentId: {
        type: String, 
        required: true,
        unique: true,
    }
}, { timestamps: true });

const TempOrder = model<TempOrder>('TempOrder', TempOrderSchema);

export default TempOrder;