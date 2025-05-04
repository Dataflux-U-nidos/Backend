import { Schema, Types } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface UniversityDocument extends UserBaseDocument {
  address: string;
  infomanagers: string[];
  viewers: string[];
  subscriptionPlanId: Types.ObjectId;
}

const UniversitySchema = new Schema<Partial<UniversityDocument>>({
  address: { type: String, required: true },
  infomanagers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  viewers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  subscriptionPlanId: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
    required: true,
  },
});

export const UniversityModel = UserBaseModel.discriminator<UniversityDocument>(
  'UNIVERSITY',
  UniversitySchema,
);
