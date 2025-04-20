import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface ViewerDocument extends UserBaseDocument {
  last_name: string;
}

const ViewerSchema = new Schema<Partial<ViewerDocument>>({
  last_name: { type: String, required: true },
});

export const ViewerModel = UserBaseModel.discriminator<ViewerDocument>(
  'VIEWER',
  ViewerSchema,
);
