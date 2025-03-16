import JobOpportunities from "../../../domain/entities/jobOpportunities.entity";
import { JobOpportunitiesRepository } from "../../../infrastructure/database/repositories/jobOpportunities.repository.impl";

export class GetJobOpportunitiesByIdUseCase {
    constructor(private readonly jobOpportunitiesRepository: JobOpportunitiesRepository) {}
  
    public async execute(id: string): Promise<JobOpportunities | null> {
      return this.jobOpportunitiesRepository.findById(id);
    }
  }