// src/application/dtos/major.dto.ts
import { Type, Static } from '@sinclair/typebox';

export const MajorBaseSchema = Type.Object({
  name: Type.String(),
  institutionId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  difficulty: Type.Union([
    Type.Literal('EASY'),
    Type.Literal('MEDIUM'),
    Type.Literal('HARD'),
  ]),
  price: Type.Number(),
  description: Type.String(),
  pensumLink: Type.String({ format: 'uri' }),
  jobId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  focus: Type.String(),
  createdBy: Type.Optional(Type.String({ pattern: '^[0-9a-fA-F]{24}$' })),
});
export type MajorBaseDto = Static<typeof MajorBaseSchema>;

// Esquema para crear un Major (entrada)
export const CreateMajorSchema = MajorBaseSchema;
export type CreateMajorDto = Static<typeof CreateMajorSchema>;

// Esquema para actualizar un Major (entrada: todos los campos son opcionales)
export const UpdateMajorSchema = Type.Partial(CreateMajorSchema);
export type UpdateMajorDto = Static<typeof UpdateMajorSchema>;

// Esquema para la respuesta de un Major (salida)
export const MajorResponseSchema = Type.Intersect([
  MajorBaseSchema,
  Type.Object({
    id: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
    createdBy: Type.String(),
  }),
]);
export type MajorResponseDto = Static<typeof MajorResponseSchema>;
