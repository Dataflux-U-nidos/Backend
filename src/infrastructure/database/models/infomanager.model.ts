import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface InfoManagerDocument extends UserBaseDocument {
  last_name: string;
  universityId: string;
}

const InfoManagerSchema = new Schema<Partial<InfoManagerDocument>>({
  last_name: { type: String, required: true },
  universityId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
});

export const InfoManagerModel =
  UserBaseModel.discriminator<InfoManagerDocument>(
    'INFOMANAGER',
    InfoManagerSchema,
  );
