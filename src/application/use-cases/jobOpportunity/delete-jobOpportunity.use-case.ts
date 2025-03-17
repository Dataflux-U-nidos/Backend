import { JobOpportunityRepository } from '../../../infrastructure';

export class DeleteJobOpportunityUseCase {
  constructor(
    private readonly jobOpportunityRepository: JobOpportunityRepository,
  ) {}

  public async execute(id: string): Promise<boolean> {
    return this.jobOpportunityRepository.delete(id);
  }
}
