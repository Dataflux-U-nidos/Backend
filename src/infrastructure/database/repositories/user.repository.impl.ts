import { UserModel } from '../../../infrastructure';
import { User, IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../../application';

export class UserRepository implements IUserRepository {
  public async findAll(filter?: {
    type?: string;
    email?: string;
  }): Promise<UserResponseDto[]> {
    const query: Record<string, unknown> = {};
    if (filter?.type) query.type = filter.type;
    if (filter?.email) query.email = filter.email;

    const results = await UserModel.find(query);
    return results.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      last_name: doc.last_name,
      email: doc.email,
      age: doc.age,
      type: doc.type,
      locality: doc.locality,
      school: doc.school,
      preferences: doc.preferences,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findById(id: string): Promise<UserResponseDto | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      last_name: doc.last_name,
      email: doc.email,
      age: doc.age,
      type: doc.type,
      locality: doc.locality,
      school: doc.school,
      preferences: doc.preferences,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async create(data: Omit<User, 'id'>): Promise<User> {
    const doc = await UserModel.create(data);
    return {
      id: doc._id.toString(),
      ...data,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> {
    const doc = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      last_name: doc.last_name,
      email: doc.email,
      password: doc.password,
      age: doc.age,
      type: doc.type,
      locality: doc.locality,
      school: doc.school,
      preferences: doc.preferences,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const doc = await UserModel.findByIdAndDelete(id);
    return doc !== null;
  }
}
