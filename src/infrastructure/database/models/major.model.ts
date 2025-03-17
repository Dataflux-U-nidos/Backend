// src/infrastructure/database/models/carrera.model.ts
import { model, Schema, Document, Types } from 'mongoose';

interface MajorDocument extends Document {
_id: Types.ObjectId;
  name: string;
  institutionId: Types.ObjectId; 
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  price: number;
  description: string;
  pensumLink: string;
  jobId: Types.ObjectId;
  focus: string;
}

const MajorSchema = new Schema<MajorDocument>({
  name: { type: String, required: true },
  // Guarda como ObjectId pero sin ref
  institutionId: { type: Schema.Types.ObjectId, required: true },
  difficulty: { type: String, enum: ['Fácil', 'Medio', 'Difícil'], required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  pensumLink: { type: String, required: true },
  jobId: { type: Schema.Types.ObjectId, required: true },
  focus: { type: String, required: true }
});

export const MajorModel = model<MajorDocument>('Majors', MajorSchema);
