import { JobOpportunityModel } from '../../../infrastructure';
import { IJobOpportunityRepository, JobOpportunity } from '../../../domain';


export class JobOpportunityRepository implements IJobOpportunityRepository{
    public async findAll(): Promise<JobOpportunity[]> {
    const results = await JobOpportunityModel.find({});
    return results.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      jobId: doc.jobId.toString(),  // Convertimos los ObjectId a string
      salary: doc.salary
    }));
    }

    public async findById(id: string): Promise<JobOpportunity | null> {
        const doc = await JobOpportunityModel.findById(id);
        if (!doc) return null;
        return {
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        jobId: doc.jobId.toString(), 
        salary: doc.salary
        };
    }

    public async create(data: Omit<JobOpportunity, 'id'>): Promise<JobOpportunity> {
        const doc = await JobOpportunityModel.create(data);
        return {
          id: doc._id.toString(),
          ...data
        };
    }

    public async update(id: string, data: Partial<Omit<JobOpportunity, "id">>): Promise<JobOpportunity | null> {
        const doc = await JobOpportunityModel.findByIdAndUpdate(id, data, { new: true });
        if (!doc) return null;
        return {
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        jobId: doc.jobId.toString(), 
        salary: doc.salary
        };
    }

   public async delete(id: string): Promise<boolean> {
        const result = await JobOpportunityModel.findByIdAndDelete(id);
        return result !== null;
    }
    
}