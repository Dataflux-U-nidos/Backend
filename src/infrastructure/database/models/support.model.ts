import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface SupportDocument extends UserBaseDocument {
  last_name: string;
}

const SupportSchema = new Schema<Partial<SupportDocument>>({
  last_name: { type: String, required: true },
});

export const SupportModel = UserBaseModel.discriminator<SupportDocument>(
  'SUPPORT',
  SupportSchema,
);
