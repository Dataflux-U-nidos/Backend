// src/infrastructure/database/models/satisfaction-survey.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface SatisfactionSurveyDocument extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  date: Date;
  bucket_id: string;
  responses: number[]; // Array de 4 respuestas numéricas
}

const SatisfactionSurveySchema = new Schema<SatisfactionSurveyDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
  bucket_id: { type: String, required: true },
  responses: {
    type: [
      {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    ],
    validate: {
      validator: (responses: number[]) => responses.length === 4,
      message: 'Debe haber exactamente 4 respuestas',
    },
  },
});

export const SatisfactionSurveyModel = model<SatisfactionSurveyDocument>(
  'SatisfactionSurvey',
  SatisfactionSurveySchema,
);
