import { Type, Static } from '@sinclair/typebox';

export const PlanTypeEnum = Type.Union([
  Type.Literal('BASIC'),
  Type.Literal('STANDARD'),
  Type.Literal('PREMIUM'),
]);

export const CreateSubscriptionPlanSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  cost: Type.Number(),
  type: PlanTypeEnum,
  benefits: Type.Array(Type.String(), { minItems: 0 }),
});
export type CreateSubscriptionPlanDto = Static<
  typeof CreateSubscriptionPlanSchema
>;

export const UpdateSubscriptionPlanSchema = Type.Partial(
  CreateSubscriptionPlanSchema,
);
export type UpdateSubscriptionPlanDto = Static<
  typeof UpdateSubscriptionPlanSchema
>;

export const SubscriptionPlanResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  cost: Type.Number(),
  type: PlanTypeEnum,
  benefits: Type.Array(Type.String()),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
export type SubscriptionPlanResponseDto = Static<
  typeof SubscriptionPlanResponseSchema
>;
