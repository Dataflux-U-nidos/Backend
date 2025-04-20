// src/infrastructure/database/models/admin.schema.ts
import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface AdminDocument extends UserBaseDocument {
  last_name: string;
}

const AdminSchema = new Schema<Partial<AdminDocument>>({
  last_name: { type: String, required: true },
});

export const AdminModel = UserBaseModel.discriminator<AdminDocument>(
  'ADMIN',
  AdminSchema,
);
