// src/infrastructure/database/models/admin.schema.ts
import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface AdminDocument extends UserBaseDocument {
  last_name: string;
  marketing: string[];
  support: string[];
  finances: string[];
}

const AdminSchema = new Schema<Partial<AdminDocument>>({
  last_name: { type: String, required: true },
  marketing: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  support: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  finances: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
});

export const AdminModel = UserBaseModel.discriminator<AdminDocument>(
  'ADMIN',
  AdminSchema,
);
