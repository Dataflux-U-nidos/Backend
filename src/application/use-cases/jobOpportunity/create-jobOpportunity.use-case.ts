import { JobOpportunityRepository } from '../../../infrastructure';
import { JobOpportunity } from '../../../domain';


export class CreateJobOpportunityUseCase {
    constructor(private readonly jobOpportunityRepository: JobOpportunityRepository) {}
  
    public async execute(data: Omit<JobOpportunity, 'id'>): Promise<JobOpportunity> {
      // Lógica de negocio adicional (si es necesaria) antes de crear
      return this.jobOpportunityRepository.create(data);
    }
  }