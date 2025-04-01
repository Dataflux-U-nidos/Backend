import { Type, Static } from '@sinclair/typebox';

export const JobOpportunitySchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  name: Type.String(),
  description: Type.String(),
  jobId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  salary: Type.Number(),
});

export type JobOpportunityDto = Static<typeof JobOpportunitySchema>;

export const CreateJobOpportunitySchema = Type.Omit(JobOpportunitySchema, [
  'id',
]);
export type CreateJobOpportunityDto = Static<typeof CreateJobOpportunitySchema>;

export const UpdateJobOpportunitySchema = Type.Partial(
  CreateJobOpportunitySchema,
);
export type UpdateJobOpportunityDto = Static<typeof UpdateJobOpportunitySchema>;

export const JobOpportunityResponseSchema = Type.Intersect([
  JobOpportunitySchema,
  Type.Object({
    id: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  }),
]);
export type MajorResponseDto = Static<typeof JobOpportunityResponseSchema>;
