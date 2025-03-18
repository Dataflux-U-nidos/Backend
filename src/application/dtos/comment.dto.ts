// src/application/dtos/comment.dto.ts
import { Type, Static } from '@sinclair/typebox';

// Esquema base de Comment
export const CommentBaseSchema = Type.Object({
  userId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  text: Type.String({ minLength: 1, maxLength: 500 }),
  date: Type.String({ format: 'date-time' }),
});
export type CommentBaseDto = Static<typeof CommentBaseSchema>;

// Esquema para crear un Comment (entrada)
export const CreateCommentSchema = CommentBaseSchema;
export type CreateCommentDto = Static<typeof CreateCommentSchema>;

// Esquema para actualizar un Comment (entrada: todos los campos son opcionales)
export const UpdateCommentSchema = Type.Partial(CreateCommentSchema);
export type UpdateCommentDto = Static<typeof UpdateCommentSchema>;

// Esquema para la respuesta de un Comment (salida)
// Se añade "id" y los timestamps de MongoDB
export const CommentResponseSchema = Type.Intersect([
  CommentBaseSchema,
  Type.Object({
    id: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  }),
]);
export type CommentResponseDto = Static<typeof CommentResponseSchema>;
