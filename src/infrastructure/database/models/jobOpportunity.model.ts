import { model, Schema } from 'mongoose';

interface JobOpportunityDocument extends Document {
  name: string;
  description: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobOpportunitySchema = new Schema<JobOpportunityDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
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
