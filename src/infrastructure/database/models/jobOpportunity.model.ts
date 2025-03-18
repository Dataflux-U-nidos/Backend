import { model, Schema, Types } from 'mongoose';

interface JobOpportunityDocument extends Document {
  name: string;
  description: string;
  jobId: Types.ObjectId;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobOpportunitySchema = new Schema<JobOpportunityDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, required: true },
    salary: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const JobOpportunityModel = model<JobOpportunityDocument>(
  'JobOpportunity',
  JobOpportunitySchema,
);
