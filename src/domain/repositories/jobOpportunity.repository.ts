import { JobOpportunity } from '../../domain';

export interface IJobOpportunityRepository {
  findAll(): Promise<JobOpportunity[]>;
  findById(id: string): Promise<JobOpportunity | null>;
  create(data: Omit<JobOpportunity, 'id'>): Promise<JobOpportunity>;
  update(
    id: string,
    data: Partial<Omit<JobOpportunity, 'id'>>,
  ): Promise<JobOpportunity | null>;
  delete(id: string): Promise<boolean>;
}
