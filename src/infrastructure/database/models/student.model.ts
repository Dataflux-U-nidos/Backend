import { Schema } from 'mongoose';
import { UserBaseModel, UserBaseDocument } from './user.base.model';

export interface StudentDocument extends UserBaseDocument {
  last_name: string;
  age: number;
  locality: string;
  school: string;
  preferences: Record<string, unknown>;
}

const StudentSchema = new Schema<Partial<StudentDocument>>({
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  locality: { type: String, required: false },
  school: { type: String, required: false },
  preferences: { type: Schema.Types.Mixed, required: false },
});

export const StudentModel = UserBaseModel.discriminator<StudentDocument>(
  'STUDENT',
  StudentSchema,
);
