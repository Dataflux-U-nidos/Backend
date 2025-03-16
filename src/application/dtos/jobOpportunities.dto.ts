import { Type, Static } from '@sinclair/typebox';

export const JobOpportunitiesSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  name: Type.String(),
  description: Type.String(),
  jobId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }), 
  salary: Type.Number()
});

// Tipos en TypeScript
export type JobOpportunitiesDto = Static<typeof JobOpportunitiesSchema>;

// DTO para creación (sin `id`, ya que lo genera MongoDB)
export const CreateJobOpportunitiesSchema = Type.Omit(JobOpportunitiesSchema, ['id']);
export type CreateJobOpportunitiesDto = Static<typeof CreateJobOpportunitiesSchema>;

// DTO para actualización (todos los campos opcionales)
export const UpdateJobOpportunitiesSchema = Type.Partial(CreateJobOpportunitiesSchema);
export type UpdateJobOpportunitiesDto = Static<typeof UpdateJobOpportunitiesSchema>;
