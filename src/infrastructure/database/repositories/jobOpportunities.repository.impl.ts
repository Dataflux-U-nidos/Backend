import JobOpportunities from "../../../domain/entities/jobOpportunities.entity";
import { IJobOpportunitiesRepository } from "../../../domain/repositories/jobOpportunities.repository";
import { JobOpportunitiesModel } from "../models/jobOpportunities.model";

export class JobOpportunitiesRepository implements IJobOpportunitiesRepository{
    public async findAll(): Promise<JobOpportunities[]> {
    const results = await JobOpportunitiesModel.find({});
    return results.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      jobId: doc.jobId.toString(),  // Convertimos los ObjectId a string
      salary: doc.salary
    }));
    }

    public async findById(id: string): Promise<JobOpportunities | null> {
        const doc = await JobOpportunitiesModel.findById(id);
        if (!doc) return null;
        return {
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        jobId: doc.jobId.toString(), 
        salary: doc.salary
        };
    }

    public async create(data: Omit<JobOpportunities, 'id'>): Promise<JobOpportunities> {
        const doc = await JobOpportunitiesModel.create(data);
        return {
          id: doc._id.toString(),
          ...data
        };
    }

    public async update(id: string, data: Partial<Omit<JobOpportunities, "id">>): Promise<JobOpportunities | null> {
        const doc = await JobOpportunitiesModel.findByIdAndUpdate(id, data, { new: true });
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
        const result = await JobOpportunitiesModel.findByIdAndDelete(id);
        return result !== null;
    }
    
}