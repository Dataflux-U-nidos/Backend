// src/infrastructure/database/models/campaign.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface CampaignDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  date: Date;
  cost: number;
  type: 'scholar' | 'university';
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<CampaignDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    cost: { type: Number, required: true },
    type: {
      type: String,
      enum: ['scholar', 'university'],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const CampaignModel = model<CampaignDocument>(
  'Campaign',
  CampaignSchema,
);
