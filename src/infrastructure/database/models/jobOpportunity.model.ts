import { model, Schema, Types } from "mongoose";

interface JobOpportunityDocument extends Document {
    name: string;
    description: string;
    jobId: Types.ObjectId; 
    salary: number;
}

const JobOpportunitySchema = new Schema<JobOpportunityDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, required: true },
    salary: { type: Number, required: true }
});

export const JobOpportunityModel = model<JobOpportunityDocument>('JobOpportunities', JobOpportunitySchema);

