import { JobOpportunityRepository } from '../../../infrastructure';
import { JobOpportunity } from '../../../domain';

export class UpdateJobOpportunityUseCase {
  constructor(
    private readonly jobOpportunityRepository: JobOpportunityRepository,
  ) {}

  public async execute(
    id: string,
    data: Partial<Omit<JobOpportunity, 'id'>>,
  ): Promise<JobOpportunity | null> {
    return this.jobOpportunityRepository.update(id, data);
  }
}
