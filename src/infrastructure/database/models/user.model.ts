// src/infrastructure/database/models/user.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  userType: 'ADMIN' | 'STUDENT' | 'VIEWER' | 'TUTOR' | 'UNIVERSITY';
  locality?: string;
  school?: string;
  preferences?: Record<string, unknown>;
  students?: Types.ObjectId[] | UserDocument[];
  infomanagers?: Types.ObjectId[] | UserDocument[];
  viewers?: Types.ObjectId[] | UserDocument[];
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
      ],
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
    infomanagers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    viewers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<UserDocument>('Users', UserSchema);
