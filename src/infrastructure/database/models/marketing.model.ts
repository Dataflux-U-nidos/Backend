import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface MarketingDocument extends UserBaseDocument {
  last_name: string;
}

const MarketingSchema = new Schema<Partial<MarketingDocument>>({
  last_name: { type: String, required: true },
});

export const MarketingModel = UserBaseModel.discriminator<MarketingDocument>(
  'MARKETING',
  MarketingSchema,
);
