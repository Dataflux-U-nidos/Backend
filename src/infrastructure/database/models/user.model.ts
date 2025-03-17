import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  type: 'ADMIN' | 'STUDENT' | 'VIEWER';
  locality?: string;
  school?: string;
  preferences?: Record<string, unknown>;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  type: { type: String, required: true, enum: ['ADMIN', 'STUDENT', 'VIEWER'] },
  locality: { type: String },
  school: { type: String },
  preferences: { type: Schema.Types.Mixed }, // Se utiliza Mixed sin any, ya que Mongoose no tipa internamente
});

export const UserModel = model<UserDocument>('Users', UserSchema);
