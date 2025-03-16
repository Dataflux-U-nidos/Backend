import JobOpportunities from "../../../domain/entities/jobOpportunities.entity";
import { JobOpportunitiesRepository } from "../../../infrastructure/database/repositories/jobOpportunities.repository.impl";

export class UpdateJobOpportunitiesUseCase {
    constructor(private readonly jobOpportunitiesRepository: JobOpportunitiesRepository) {}
  
    public async execute(
      id: string, 
      data: Partial<Omit<JobOpportunities, 'id'>>
    ): Promise<JobOpportunities | null> {
      return this.jobOpportunitiesRepository.update(id, data);
    }
  }