import { MajorModel } from '../../../infrastructure';
import { Major, IMajorRepository } from '../../../domain';
import { MajorResponseDto } from '../../../application';

export class MajorRepository implements IMajorRepository {
  public async findAll(): Promise<MajorResponseDto[]> {
    const results = await MajorModel.find({});
    return results.map((doc) => ({
      id: doc._id as unknown as string,
      name: doc.name,
      institutionId: doc.institutionId as unknown as string,
      difficulty: doc.difficulty,
      price: doc.price,
      description: doc.description,
      pensumLink: doc.pensumLink,
      jobId: doc.jobId as unknown as string,
      focus: doc.focus,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findById(id: string): Promise<MajorResponseDto | null> {
    const doc = await MajorModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id as unknown as string,
      name: doc.name,
      institutionId: doc.institutionId as unknown as string,
      difficulty: doc.difficulty,
      price: doc.price,
      description: doc.description,
      pensumLink: doc.pensumLink,
      jobId: doc.jobId as unknown as string,
      focus: doc.focus,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async create(data: Omit<Major, 'id'>): Promise<Major> {
    const doc = await MajorModel.create(data);
    return {
      id: doc._id as unknown as string,
      ...data,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<Major, 'id'>>,
  ): Promise<Major | null> {
    const doc = await MajorModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id as unknown as string,
      name: doc.name,
      institutionId: doc.institutionId as unknown as string,
      difficulty: doc.difficulty,
      price: doc.price,
      description: doc.description,
      pensumLink: doc.pensumLink,
      jobId: doc.jobId as unknown as string,
      focus: doc.focus,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await MajorModel.findByIdAndDelete(id);
    return result !== null;
  }
}
