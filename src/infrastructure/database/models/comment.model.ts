// src/infrastructure/database/models/comment.model.ts
import { model, Schema, Document, Types } from 'mongoose';

interface CommentDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  majorId: Types.ObjectId;
  text: string;
  //date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    majorId: { type: Schema.Types.ObjectId, required: true, ref: 'Majors' },
    text: { type: String, required: true, minlength: 1, maxlength: 500 },
    //date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export const CommentModel = model<CommentDocument>('Comments', CommentSchema);
