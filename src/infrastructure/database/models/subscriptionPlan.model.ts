import { Schema, model, Document, Types } from 'mongoose';

export interface SubscriptionPlanDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  cost: number;
  type: 'BASIC' | 'STANDARD' | 'PREMIUM';
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<SubscriptionPlanDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: ['BASIC', 'STANDARD', 'PREMIUM'],
    },
    benefits: { type: [String], required: true, default: [] },
  },
  { timestamps: true },
);

export const SubscriptionPlanModel = model<SubscriptionPlanDocument>(
  'SubscriptionPlan',
  SubscriptionPlanSchema,
);
