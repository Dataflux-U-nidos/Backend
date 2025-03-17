import { Type, Static } from "@sinclair/typebox";

export const CommentSchema = Type.Object({
  UserId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }), 
  text: Type.String({ minLength: 1, maxLength: 500 }),
  date: Type.String({ format: "date-time" }),
});

export type CommentType = Static<typeof CommentSchema>;

// cuando se cree un comentario, se espera que tenga todos los campos obligatorios definidos en CommentSchema.
export const CreateCommentSchema = CommentSchema;
// Este esquema permite enviar solo los datos que se desean modificar, sin requerir todos los campos.
export const UpdateCommentSchema = Type.Partial(CommentSchema);
