// src/infrastructure/database/models/user.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  type: 'ADMIN' | 'STUDENT' | 'VIEWER' | 'TUTOR' | 'UNIVERSITY';
  locality?: string;
  school?: string;
  preferences?: Record<string, unknown>;
  students?: Types.ObjectId[] | UserDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: ['ADMIN', 'STUDENT', 'VIEWER', 'TUTOR', 'UNIVERSITY'],
    },
    locality: { type: String },
    school: { type: String },
    preferences: { type: Schema.Types.Mixed },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<UserDocument>('Users', UserSchema);
