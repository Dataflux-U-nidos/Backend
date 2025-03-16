import JobOpportunities from "../../../domain/entities/jobOpportunities.entity";
import { JobOpportunitiesRepository } from "../../../infrastructure/database/repositories/jobOpportunities.repository.impl";

export class CreateJobOpportunitiesUseCase {
    constructor(private readonly jobOpportunitiesRepository: JobOpportunitiesRepository) {}
  
    public async execute(data: Omit<JobOpportunities, 'id'>): Promise<JobOpportunities> {
      // Lógica de negocio adicional (si es necesaria) antes de crear
      return this.jobOpportunitiesRepository.create(data);
    }
  }