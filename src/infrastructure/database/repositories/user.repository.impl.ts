import { UserModel, UserDocument } from '../../../infrastructure';
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

    const results = await UserModel.find(query)
      .populate('students', '_id') // solo para obtener el _id de cada student
      .exec();

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
      students: doc.students?.map((s) => s._id.toString()),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }
  public async findById(id: string): Promise<UserResponseDto | null> {
    const doc = await UserModel.findById(id).populate('students', '_id').exec();
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
      students: doc.students?.map((s) => s._id.toString()),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email });
    if (!doc) return null;
    return {
      id: doc._id as unknown as string,
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

  public async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const doc = await UserModel.create(data);
    return {
      id: doc._id as unknown as string,
      ...data,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User | null> {
    const doc = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id as unknown as string,
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

  public async findStudentsByTutor(
    tutorId: string,
  ): Promise<UserResponseDto[]> {
    // Busca al tutor y "popula" completamente sus students
    const tutorDoc = await UserModel.findById(tutorId)
      .populate('students') // sin segundo argumento, trae todos los campos
      .exec();
    if (!tutorDoc || !tutorDoc.students) return [];

    // Mapea cada student a nuestro DTO de respuesta
    const students = (tutorDoc.students as UserDocument[]).map((doc) => ({
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
    return students;
  }

  public async addStudentToTutor(
    tutorId: string,
    studentId: string,
  ): Promise<void> {
    await UserModel.findByIdAndUpdate(
      tutorId,
      { $addToSet: { students: studentId } }, // push único
      { new: true },
    ).exec();
  }
}
