import { JobOpportunityRepository } from '../../../infrastructure';
import { JobOpportunity } from '../../../domain';

export class GetJobOpportunityByIdUseCase {
  constructor(
    private readonly jobOpportunityRepository: JobOpportunityRepository,
  ) {}

  public async execute(id: string): Promise<JobOpportunity | null> {
    return this.jobOpportunityRepository.findById(id);
  }
}
