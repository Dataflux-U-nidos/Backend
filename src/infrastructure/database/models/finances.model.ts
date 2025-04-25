import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface FinancesDocument extends UserBaseDocument {
  last_name: string;
}

const FinanacesSchema = new Schema<Partial<FinancesDocument>>({
  last_name: { type: String, required: true },
});

export const FinancesModel = UserBaseModel.discriminator<FinancesDocument>(
  'FINANCES',
  FinanacesSchema,
);
