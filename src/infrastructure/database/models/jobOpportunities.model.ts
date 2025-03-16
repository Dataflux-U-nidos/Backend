import { model, Schema, Types } from "mongoose";

interface JobOpportunitiesDocument extends Document {
    name: string;
    description: string;
    jobId: Types.ObjectId; 
    salary: number;
}

const JobOpportunitiesSchema = new Schema<JobOpportunitiesDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, required: true },
    salary: { type: Number, required: true }
});

export const JobOpportunitiesModel = model<JobOpportunitiesDocument>('JobOpportunities', JobOpportunitiesSchema);

