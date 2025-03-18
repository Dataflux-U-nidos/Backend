export interface JobOpportunity {
  id: string;
  name: string;
  description: string;
  jobId: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}

export default JobOpportunity;
