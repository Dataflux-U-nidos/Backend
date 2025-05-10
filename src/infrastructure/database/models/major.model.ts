import { model, Schema, Document, Types } from 'mongoose';

export interface MajorDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  institutionId: Types.ObjectId;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  description: string;
  pensumLink: string;
  jobOpportunityIds: Types.ObjectId[];
  focus: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MajorSchema = new Schema<MajorDocument>(
  {
    name: { type: String, required: true },
    institutionId: {
      type: Schema.Types.ObjectId,
      ref: 'Institutions',
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['EASY', 'MEDIUM', 'HARD'],
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    pensumLink: { type: String, required: true },
    jobOpportunityIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'JobOpportunity',
        default: [],
      },
    ],
    focus: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true },
);

export const MajorModel = model<MajorDocument>('Majors', MajorSchema);
