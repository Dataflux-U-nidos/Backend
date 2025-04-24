// src/infrastructure/database/repositories/user.repository.impl.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';
import {
  AdminUser,
  BaseUser,
  InfoManagerUser,
  StudentUser,
  TutorUser,
  UniversityUser,
  User,
  ViewerUser,
} from '../../../domain/entities/user.entity';
import { UserResponseDto } from '../../../application/dtos/user.dto';
import { UserBaseModel, UserBaseDocument } from '../../../infrastructure/';
import {
  StudentModel,
  StudentDocument,
  TutorModel,
  TutorDocument,
  UniversityModel,
  UniversityDocument,
  InfoManagerModel,
  InfoManagerDocument,
  ViewerModel,
  ViewerDocument,
  AdminModel,
  AdminDocument,
} from '../../../infrastructure';

type UserDocument =
  | UserBaseDocument
  | StudentDocument
  | TutorDocument
  | UniversityDocument
  | InfoManagerDocument
  | ViewerDocument
  | AdminDocument;

export class UserRepository implements IUserRepository {
  public async findAll(filter?: {
    userType?: string;
    email?: string;
  }): Promise<UserResponseDto[]> {
    const query: { userType?: string; email?: string } = {};
    if (filter?.userType) query.userType = filter.userType;
    if (filter?.email) query.email = filter.email;

    const docs = await UserBaseModel.find(query).exec();
    return docs.map((doc) => this.mapDoc(doc));
  }

  public async findById(id: string): Promise<UserResponseDto | null> {
    const doc = await UserBaseModel.findById(id).exec();
    return doc ? this.mapDoc(doc) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const doc = await UserBaseModel.findOne({ email }).exec();
    return doc ? this.mapEntity(doc) : null;
  }

  public async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    let createdDoc: UserDocument;
    switch (data.userType) {
      case 'ADMIN':
        createdDoc = await AdminModel.create(data as AdminDocument);
        break;
      case 'STUDENT':
        createdDoc = await StudentModel.create(data as StudentDocument);
        break;
      case 'TUTOR':
        createdDoc = await TutorModel.create(data as TutorDocument);
        break;
      case 'UNIVERSITY':
        createdDoc = await UniversityModel.create(data as UniversityDocument);
        break;
      case 'INFOMANAGER':
        createdDoc = await InfoManagerModel.create(data as InfoManagerDocument);
        break;
      case 'VIEWER':
        createdDoc = await ViewerModel.create(data as ViewerDocument);
        break;
      default:
        createdDoc = await UserBaseModel.create(data as UserBaseDocument);
    }
    return this.mapEntity(createdDoc);
  }

  public async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User | null> {
    const doc = await UserBaseModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return doc ? this.mapEntity(doc) : null;
  }

  public async updateByEmail(
    email: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<BaseUser | null> {
    const doc = await UserBaseModel.findOneAndUpdate({ email }, data, {
      new: true,
    });
    if (!doc) return null;

    return {
      id: doc._id as unknown as string,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      userType: doc.userType as User['userType'],
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const doc = await UserBaseModel.findByIdAndDelete(id).exec();
    return doc !== null;
  }

  public async findStudentsByTutor(
    tutorId: string,
  ): Promise<UserResponseDto[]> {
    const tutorDoc = await TutorModel.findById(tutorId)
      .populate<{ students: StudentDocument[] }>('students')
      .exec();
    if (!tutorDoc || !tutorDoc.students) return [];
    return tutorDoc.students.map((d) => this.mapDoc(d));
  }

  public async addStudentToTutor(
    tutorId: string,
    studentId: string,
  ): Promise<void> {
    await TutorModel.findByIdAndUpdate(
      tutorId,
      { $addToSet: { students: studentId } },
      { new: true },
    ).exec();
  }

  public async addInfoManagerToUniversity(
    universityId: string,
    infomanagerId: string,
  ): Promise<void> {
    await UniversityModel.findByIdAndUpdate(
      universityId,
      { $addToSet: { infomanagers: infomanagerId } },
      { new: true },
    ).exec();
  }

  public async addViewerToUniversity(
    universityId: string,
    viewerId: string,
  ): Promise<void> {
    await UniversityModel.findByIdAndUpdate(
      universityId,
      { $addToSet: { viewers: viewerId } },
      { new: true },
    ).exec();
  }

  public async findInfoManagersByUniversity(
    universityId: string,
  ): Promise<UserResponseDto[]> {
    const uniDoc = await UniversityModel.findById(universityId)
      .populate<{ infomanagers: InfoManagerDocument[] }>('infomanagers')
      .exec();
    if (!uniDoc || !uniDoc.infomanagers) return [];
    return uniDoc.infomanagers.map((d) => this.mapDoc(d));
  }
  public async findViewersByUniversity(
    universityId: string,
  ): Promise<UserResponseDto[]> {
    const uniDoc = await UniversityModel.findById(universityId)
      .populate<{ viewers: ViewerDocument[] }>('viewers')
      .exec();
    if (!uniDoc || !uniDoc.viewers) return [];
    return uniDoc.viewers.map((d) => this.mapDoc(d));
  }

  private mapDoc(
    doc:
      | UserBaseDocument
      | StudentDocument
      | TutorDocument
      | UniversityDocument
      | InfoManagerDocument
      | ViewerDocument,
  ): UserResponseDto {
    const base: Partial<UserResponseDto> = {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      userType: doc.userType,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
    if ('last_name' in doc) base.last_name = doc.last_name;
    if ('age' in doc) base.age = doc.age;
    if ('locality' in doc) base.locality = doc.locality;
    if ('school' in doc) base.school = doc.school;
    if ('preferences' in doc) base.preferences = doc.preferences;
    if ('students' in doc && Array.isArray(doc.students))
      base.students = doc.students.map((s) => s.toString());
    if ('address' in doc) base.address = doc.address;
    if ('infomanagers' in doc && Array.isArray(doc.infomanagers))
      base.infomanagers = doc.infomanagers.map((s) => s.toString());
    if ('viewers' in doc && Array.isArray(doc.viewers))
      base.viewers = doc.viewers.map((s) => s.toString());
    if ('universityId' in doc && doc.universityId)
      base.universityId = doc.universityId.toString();
    return base as UserResponseDto;
  }

  private mapEntity(
    doc:
      | UserBaseDocument
      | StudentDocument
      | TutorDocument
      | UniversityDocument
      | InfoManagerDocument
      | ViewerDocument,
  ): User {
    const base = {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      userType: doc.userType as User['userType'],
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    switch (doc.userType) {
      case 'ADMIN':
        return {
          ...base,
          last_name: (doc as UserBaseDocument & { last_name: string })
            .last_name,
        } as AdminUser;
      case 'STUDENT': {
        const d = doc as StudentDocument;
        return {
          ...base,
          last_name: d.last_name,
          age: d.age,
          locality: d.locality,
          school: d.school,
          preferences: d.preferences,
        } as StudentUser;
      }
      case 'VIEWER':
        return {
          ...base,
          last_name: (doc as ViewerDocument).last_name,
        } as ViewerUser;
      case 'TUTOR': {
        const d = doc as TutorDocument;
        return {
          ...base,
          last_name: d.last_name,
          students: d.students.map((s) => s.toString()),
        } as TutorUser;
      }
      case 'UNIVERSITY': {
        const d = doc as UniversityDocument;
        return {
          ...base,
          address: d.address,
          infomanagers: d.infomanagers.map((s) => s.toString()),
          viewers: d.viewers.map((s) => s.toString()),
        } as UniversityUser;
      }
      case 'INFOMANAGER': {
        const d = doc as InfoManagerDocument;
        return {
          ...base,
          last_name: d.last_name,
          universityId: d.universityId.toString(),
        } as InfoManagerUser;
      }
      default:
        return base as User;
    }
  }
}
