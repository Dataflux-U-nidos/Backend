import { model, Schema, Types } from "mongoose";

interface JobOpportunitiesDocument extends Document {
    name: string;
    description: string;
    jobs: Types.ObjectId[]; // Relación con múltiples carreras
    salary: number;
}

const JobOpportunitiesSchema = new Schema<JobOpportunitiesDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Major', required: true }], // Relación con Major
    salary: { type: Number, required: true }
});

export const JobOpportunitiesModel = model<JobOpportunitiesDocument>('JobOpportunities', JobOpportunitiesSchema);

