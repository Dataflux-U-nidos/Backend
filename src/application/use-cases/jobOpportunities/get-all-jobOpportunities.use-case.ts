import JobOpportunities from "../../../domain/entities/jobOpportunities.entity";
import { JobOpportunitiesRepository } from "../../../infrastructure/database/repositories/jobOpportunities.repository.impl";

export class GetAllJobOpportunitiesUseCase {
    constructor(private readonly jobOpportunitiesRepository: JobOpportunitiesRepository) {}
  
    public async execute(): Promise<JobOpportunities[]> {
      return this.jobOpportunitiesRepository.findAll();
    }
  }