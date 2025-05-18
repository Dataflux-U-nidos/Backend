// src/application/dtos/satisfaction-survey.dto.ts
import { Type, Static } from '@sinclair/typebox';

export const SatisfactionSurveySchema = Type.Object({
  bucket_id: Type.String(),
  responses: Type.Array(Type.Integer({ minimum: 1, maximum: 5 }), {
    minItems: 4,
    maxItems: 4,
  }),
});

export const CreateSatisfactionSurveySchema = SatisfactionSurveySchema;
export type CreateSatisfactionSurveyDto = Static<
  typeof CreateSatisfactionSurveySchema
>;

// src/application/dtos/satisfaction-survey.dto.ts
export const SatisfactionSurveyResponseSchema = Type.Object({
  id: Type.String(),
  user_id: Type.String(),
  bucket_id: Type.String(),
  date: Type.String({ format: 'date-time' }),
  responses: Type.Array(Type.Integer({ minimum: 1, maximum: 5 }), {
    minItems: 4,
    maxItems: 4,
  }),
});

export type SatisfactionSurveyResponseDto = Static<
  typeof SatisfactionSurveyResponseSchema
>;
