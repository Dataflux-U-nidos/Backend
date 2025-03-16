import JobOpportunities from "../entities/jobOpportunities.entity";


export interface IJobOpportunitiesRepository {
  findAll(): Promise<JobOpportunities[]>;  
  findById(id: string): Promise<JobOpportunities | null>;  
  create(data: Omit<JobOpportunities, 'id'>): Promise<JobOpportunities>;  
  update(id: string, data: Partial<Omit<JobOpportunities, 'id'>>): Promise<JobOpportunities | null>;  
  delete(id: string): Promise<boolean>;  
}
