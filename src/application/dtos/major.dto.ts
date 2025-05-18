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
  jobOpportunityIds: Type.Array(Type.String({ pattern: '^[0-9a-fA-F]{24}$' })), // ← aquí
  focus: Type.String(),
  createdBy: Type.Optional(Type.String({ pattern: '^[0-9a-fA-F]{24}$' })),
  preferences: Type.Array(Type.String()),
});

export type MajorBaseDto = Static<typeof MajorBaseSchema>;

// ... CreateMajorSchema y UpdateMajorSchema heredan como antes ...

export const MajorResponseSchema = Type.Intersect([
  MajorBaseSchema,
  Type.Object({
    id: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
    // Ya no definimos createdBy aquí, para que se use el del MajorBaseSchema que es opcional
  }),
]);
export type MajorResponseDto = Static<typeof MajorResponseSchema>;
