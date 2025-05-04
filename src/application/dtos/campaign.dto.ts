// src/application/dtos/campaign.dto.ts
import { Type, Static } from '@sinclair/typebox';

const CampaignTypeEnum = Type.Union([
  Type.Literal('scholar'),
  Type.Literal('university'),
]);

// Crear
export const CreateCampaignSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  date: Type.String({ format: 'date-time' }),
  cost: Type.Number(),
  type: CampaignTypeEnum,
  createdBy: Type.String(),
});
export type CreateCampaignDto = Static<typeof CreateCampaignSchema>;

// Actualizar (opcional)
export const UpdateCampaignSchema = Type.Partial(CreateCampaignSchema);
export type UpdateCampaignDto = Static<typeof UpdateCampaignSchema>;

// Respuesta
export const CampaignResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  date: Type.String({ format: 'date-time' }),
  cost: Type.Number(),
  type: CampaignTypeEnum,
  createdBy: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
export type CampaignResponseDto = Static<typeof CampaignResponseSchema>;

export const TotalInvestmentResponseSchema = Type.Object({
  scholarTotal: Type.Number(),
  universityTotal: Type.Number(),
  total: Type.Number(),
});
export type TotalInvestmentResponseDto = Static<
  typeof TotalInvestmentResponseSchema
>;
