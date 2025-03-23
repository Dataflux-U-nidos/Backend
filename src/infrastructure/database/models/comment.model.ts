// src/infrastructure/database/models/comment.model.ts
import { model, Schema, Document, Types } from 'mongoose';

interface CommentDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>({
  // Guarda como ObjectId pero sin ref
  userId: { type: Schema.Types.ObjectId, required: true }, // Referencia a la colección de usuarios
  text: { type: String, required: true, minlength: 1, maxlength: 500 },
  date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true},
);

export const CommentModel = model<CommentDocument>('Comments', CommentSchema);
