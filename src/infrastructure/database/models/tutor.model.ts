import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface TutorDocument extends UserBaseDocument {
  last_name: string;
  students: string[];
}

const TutorSchema = new Schema<Partial<TutorDocument>>({
  last_name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
});

export const TutorModel = UserBaseModel.discriminator<TutorDocument>(
  'TUTOR',
  TutorSchema,
);
