import { Schema, Document, model, models } from 'mongoose';

interface Visit extends Document {
  visitTime: Date;
  page: string;
  userId?: string;
  referrer?: string;
  ipAddress?: string;
}

const VisitSchema = new Schema<Visit>(
  {
    visitTime: { type: Date, required: true, default: Date.now },
    page: { type: String, required: true },
    userId: { type: String },
    referrer: { type: String },
    ipAddress: { type: String }
  }
);

export default models.Visit || model<Visit>('Visit', VisitSchema);