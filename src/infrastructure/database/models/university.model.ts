import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface UniversityDocument extends UserBaseDocument {
  address: string;
  infomanagers: string[];
  viewers: string[];
}

const UniversitySchema = new Schema<Partial<UniversityDocument>>({
  address: { type: String, required: true },
  infomanagers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  viewers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
});

export const UniversityModel = UserBaseModel.discriminator<UniversityDocument>(
  'UNIVERSITY',
  UniversitySchema,
);
