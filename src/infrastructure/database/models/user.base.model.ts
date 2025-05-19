import { Schema, model, Document, Types } from 'mongoose';

export interface UserBaseDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  userType:
    | 'ADMIN'
    | 'STUDENT'
    | 'VIEWER'
    | 'TUTOR'
    | 'UNIVERSITY'
    | 'INFOMANAGER'
    | 'MARKETING'
    | 'SUPPORT'
    | 'FINANCES'
    | undefined;
  createdAt: Date;
  updatedAt: Date;
}
const BaseSchema = new Schema<UserBaseDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      required: true,
      enum: [
        'ADMIN',
        'STUDENT',
        'VIEWER',
        'TUTOR',
        'UNIVERSITY',
        'INFOMANAGER',
        'MARKETING',
        'SUPPORT',
        'FINANCES',
      ],
    },
  },
  {
    discriminatorKey: 'userType',
    timestamps: true,
  },
);

export const UserBaseModel = model<UserBaseDocument>('Users', BaseSchema);
