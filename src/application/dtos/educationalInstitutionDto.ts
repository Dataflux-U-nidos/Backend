import { Type, Static } from '@sinclair/typebox';

export const EventSchema = Type.Object({
  name: Type.String(),
  descirption: Type.String(),
  date: Type.String({ format: 'date-time' }), // ISO 8601
  location: Type.String(),
});

export const EducationalInstitutionSchema = Type.Object({
  name: Type.String(),
  location_l: Type.String(),
  price_range: Type.Union([
    Type.Literal('LOW'),
    Type.Literal('MEDIUM'),
    Type.Literal('HIGH'),
  ]),
  aceptation_difficulty: Type.Union([
    Type.Literal('EASY'),
    Type.Literal('MEDIUM'),
    Type.Literal('HARD'),
  ]),
  description: Type.String(),
  link: Type.String({ format: 'uri' }),
  events: Type.Array(EventSchema),
});

export const CreateEducationalInstitutionSchema = EducationalInstitutionSchema;
export type EducationalInstitutionDto = Static<typeof EducationalInstitutionSchema>;
export type EventDto = Static<typeof EventSchema>;

export const UpdateEducationalInstitutionSchema = Type.Partial(EducationalInstitutionSchema,);
export type UpdateEducationalInstitutionDto = Static<typeof UpdateEducationalInstitutionSchema>;

export const EducationalInstitutionResponseSchema = Type.Intersect([
  EducationalInstitutionSchema,
  Type.Object({
    id: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  }),
]);

export type EducationalInstitutionResponseDto = Static<typeof EducationalInstitutionResponseSchema>;
