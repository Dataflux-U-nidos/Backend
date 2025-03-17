import { JobOpportunityRepository } from '../../../infrastructure';
import { JobOpportunity } from '../../../domain';

export class GetAllJobOpportunityUseCase {
    constructor(private readonly jobOpportunityRepository: JobOpportunityRepository) {}
  
    public async execute(): Promise<JobOpportunity[]> {
      return this.jobOpportunityRepository.findAll();
    }
  }