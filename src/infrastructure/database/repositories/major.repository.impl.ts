import { MajorModel } from '../../../infrastructure';
import { Major, IMajorRepository } from '../../../domain';

export class MajorRepository implements IMajorRepository {
  public async findAll(): Promise<Major[]> {
    const results = await MajorModel.find({});
    return results.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      institutionId: doc.institutionId.toString(),
      difficulty: doc.difficulty,
      price: doc.price,
      description: doc.description,
      pensumLink: doc.pensumLink,
      jobId: doc.jobId.toString(),
      focus: doc.focus,
    }));
  }

  public async findById(id: string): Promise<Major | null> {
    const doc = await MajorModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      institutionId: doc.institutionId.toString(),
      difficulty: doc.difficulty,
      price: doc.price,
      description: doc.description,
      pensumLink: doc.pensumLink,
      jobId: doc.jobId.toString(),
      focus: doc.focus,
    };
  }

  public async create(data: Omit<Major, 'id'>): Promise<Major> {
    const doc = await MajorModel.create(data);
    return {
      id: doc._id.toString(),
      ...data,
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<Major, 'id'>>,
  ): Promise<Major | null> {
    const doc = await MajorModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      institutionId: doc.institutionId.toString(),
      difficulty: doc.difficulty,
      price: doc.price,
      description: doc.description,
      pensumLink: doc.pensumLink,
      jobId: doc.jobId.toString(),
      focus: doc.focus,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await MajorModel.findByIdAndDelete(id);
    return result !== null;
  }
}
