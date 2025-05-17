import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface StudentDocument extends UserBaseDocument {
  last_name: string;
  age: number;
  zone: string;
  locality: string;
  school: string;
  preferences: string[];
  testCompleted: boolean;
  le: number;
  ma: number;
  ci: number;
  cc: number;
  idi: number;
  ar: number;
}

const StudentSchema = new Schema<Partial<StudentDocument>>({
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  zone: { type: String, required: false, default: '' },
  locality: { type: String, required: false, default: '' },
  school: { type: String, required: false },
  preferences: {
    type: [String],
    default: [],
  },
  testCompleted: { type: Boolean, required: false, default: false },
  le: { type: Number, required: false, default: 0 },
  ma: { type: Number, required: false, default: 0 },
  ci: { type: Number, required: false, default: 0 },
  cc: { type: Number, required: false, default: 0 },
  idi: { type: Number, required: false, default: 0 },
  ar: { type: Number, required: false, default: 0 },
});

export const StudentModel = UserBaseModel.discriminator<StudentDocument>(
  'STUDENT',
  StudentSchema,
);
