import { model, Schema, Document, Types } from 'mongoose';

export interface MajorDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  institutionId: Types.ObjectId;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  description: string;
  pensumLink: string;
  jobId: Types.ObjectId;
  focus: string;
  createdAt: Date;
  updatedAt: Date;
}

const MajorSchema = new Schema<MajorDocument>(
  {
    name: { type: String, required: true },
    institutionId: { type: Schema.Types.ObjectId, required: true },
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    pensumLink: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, required: true },
    focus: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

export const MajorModel = model<MajorDocument>('Majors', MajorSchema);
