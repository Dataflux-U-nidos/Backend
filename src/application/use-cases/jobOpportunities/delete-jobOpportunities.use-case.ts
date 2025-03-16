import { JobOpportunitiesRepository } from "../../../infrastructure/database/repositories/jobOpportunities.repository.impl";

export class DeleteJobOpportunitiesUseCase {
    constructor(private readonly jobOpportunitiesRepository: JobOpportunitiesRepository) {}
  
    public async execute(id: string): Promise<boolean> {
      return this.jobOpportunitiesRepository.delete(id);
    }
  }