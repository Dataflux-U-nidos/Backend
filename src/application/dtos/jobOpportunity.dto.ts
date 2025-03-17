import { Type, Static } from '@sinclair/typebox';

export const JobOpportunitySchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  name: Type.String(),
  description: Type.String(),
  jobId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }), 
  salary: Type.Number()
});

// Tipos en TypeScript
export type JobOpportunityDto = Static<typeof JobOpportunitySchema>;

// DTO para creación (sin `id`, ya que lo genera MongoDB)
export const CreateJobOpportunitySchema = Type.Omit(JobOpportunitySchema, ['id']);
export type CreateJobOpportunityDto = Static<typeof CreateJobOpportunitySchema>;

// DTO para actualización (todos los campos opcionales)
export const UpdateJobOpportunitySchema = Type.Partial(CreateJobOpportunitySchema);
export type UpdateJobOpportunityDto = Static<typeof UpdateJobOpportunitySchema>;
