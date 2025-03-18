// src/application/dtos/major.dto.ts
import { Type, Static } from '@sinclair/typebox';

export const MajorBaseSchema = Type.Object({
  name: Type.String(),
  institutionId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  difficulty: Type.Union([
    Type.Literal('LOW'),
    Type.Literal('MEDIUM'),
    Type.Literal('HIGH'),
  ]),
  price: Type.Number(),
  description: Type.String(),
  pensumLink: Type.String({ format: 'uri' }),
  jobId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  focus: Type.String(),
});
export type MajorBaseDto = Static<typeof MajorBaseSchema>;

// Esquema para crear un Major (entrada)
export const CreateMajorSchema = MajorBaseSchema;
export type CreateMajorDto = Static<typeof CreateMajorSchema>;

// Esquema para actualizar un Major (entrada: todos los campos son opcionales)
export const UpdateMajorSchema = Type.Partial(CreateMajorSchema);
export type UpdateMajorDto = Static<typeof UpdateMajorSchema>;

// Esquema para la respuesta de un Major (salida)
// Se añade "id" y los campos de timestamps (createdAt y updatedAt)
export const MajorResponseSchema = Type.Intersect([
  MajorBaseSchema,
  Type.Object({
    id: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  }),
]);
export type MajorResponseDto = Static<typeof MajorResponseSchema>;
