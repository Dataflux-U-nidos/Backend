import { Schema, Types } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';
import { Event } from '../../../domain';

export interface UniversityDocument extends UserBaseDocument {
  address: string;
  infomanagers: string[];
  viewers: string[];
  subscriptionPlanId: Types.ObjectId;
  zone: string;
  locality: string;
  price_range: 'LOW' | 'MEDIUM' | 'HIGH';
  aceptation_difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  link: string;
  events: Event[];
}

const EventSchema = new Schema<Event>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
  },
  { _id: true },
);

const UniversitySchema = new Schema<Partial<UniversityDocument>>({
  address: { type: String, required: true },
  infomanagers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  viewers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  subscriptionPlanId: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
    required: true,
  },
  zone: { type: String, required: false },
  locality: { type: String, required: false },
  price_range: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    required: true,
  },
  aceptation_difficulty: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD'],
    required: true,
  },
  description: { type: String, required: true },
  link: { type: String, required: true },
  events: { type: [EventSchema], required: true },
});

export const UniversityModel = UserBaseModel.discriminator<UniversityDocument>(
  'UNIVERSITY',
  UniversitySchema,
);
