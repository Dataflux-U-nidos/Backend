// src/infrastructure/database/repositories/user.repository.impl.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';
import {
  AdminUser,
  InfoManagerUser,
  StudentUser,
  TutorUser,
  UniversityUser,
  User,
  ViewerUser,
  MarketingUser,
  SupportUser,
  FinancesUser,
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
  MarketingModel,
  MarketingDocument,
  SupportModel,
  SupportDocument,
  FinancesModel,
  FinancesDocument,
} from '../../../infrastructure';


type UserDocument =
  | UserBaseDocument
  | StudentDocument
  | TutorDocument
  | UniversityDocument
  | InfoManagerDocument
  | ViewerDocument
  | AdminDocument
  | MarketingDocument
  | SupportDocument
  | FinancesDocument;

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
      case 'MARKETING':
        createdDoc = await MarketingModel.create(data as MarketingDocument);
        break;
      case 'SUPPORT':
        createdDoc = await SupportModel.create(data as SupportDocument);
        break;
      case 'FINANCES':
        createdDoc = await FinancesModel.create(data as FinancesDocument);
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

  // Add Marketing to Admin
  public async addMarketingToAdmin(
    adminId: string,
    marketingId: string,
  ): Promise<void> {
    await AdminModel.findByIdAndUpdate(
      adminId,
      { $addToSet: { marketing: marketingId } },
      { new: true },
    ).exec();
  }

  // Add Support to Admin
  public async addSupportToAdmin(
    adminId: string,
    supportId: string,
  ): Promise<void> {
    await AdminModel.findByIdAndUpdate(
      adminId,
      { $addToSet: { support: supportId } },
      { new: true },
    ).exec();
  }

  // Add Finances to Admin
  public async addFinancesToAdmin(
    adminId: string,
    financesId: string,
  ): Promise<void> {
    await AdminModel.findByIdAndUpdate(
      adminId,
      { $addToSet: { finances: financesId } },
      { new: true },
    ).exec();
  }

  // find marketing by Admin
  public async findMarketersByAdmin(
    adminId: string,
  ): Promise<UserResponseDto[]> {
    const uniDoc = await AdminModel.findById(adminId)
      .populate<{ marketing: MarketingDocument[] }>('marketing')
      .exec();
    if (!uniDoc || !uniDoc.marketing) return [];
    return uniDoc.marketing.map((d) => this.mapDoc(d));
  }

  // find support by Admin
  public async findSupportsByAdmin(
    adminId: string,
  ): Promise<UserResponseDto[]> {
    const uniDoc = await AdminModel.findById(adminId)
      .populate<{ support: SupportDocument[] }>('support')
      .exec();
    if (!uniDoc || !uniDoc.support) return [];
    return uniDoc.support.map((d) => this.mapDoc(d));
  }

  // find finances by Admin
  public async findFinancesByAdmin(
    adminId: string,
  ): Promise<UserResponseDto[]> {
    const uniDoc = await AdminModel.findById(adminId)
      .populate<{ finances: FinancesDocument[] }>('finances')
      .exec();
    if (!uniDoc || !uniDoc.finances) return [];
    return uniDoc.finances.map((d) => this.mapDoc(d));
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
      | ViewerDocument
      | AdminDocument
      | MarketingDocument
      | SupportDocument
      | FinancesDocument,
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
    if ('marketing' in doc && Array.isArray(doc.marketing))
      base.marketing = doc.marketing.map((s) => s.toString());
    if ('support' in doc && Array.isArray(doc.support))
      base.support = doc.support.map((s) => s.toString());
    if ('finances' in doc && Array.isArray(doc.finances))
      base.finances = doc.finances.map((s) => s.toString());
    return base as UserResponseDto;
  }

  private mapEntity(
    doc:
      | UserBaseDocument
      | StudentDocument
      | TutorDocument
      | UniversityDocument
      | InfoManagerDocument
      | ViewerDocument
      | AdminDocument
      | MarketingDocument
      | SupportDocument
      | FinancesDocument,
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
      case 'ADMIN': {
        const d = doc as AdminDocument;
        return {
          ...base,
          last_name: d.last_name,
          marketing: d.marketing.map((s) => s.toString()),
          support: d.support.map((s) => s.toString()),
          finances: d.finances.map((s) => s.toString()),
        } as AdminUser;
      }
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
      case 'MARKETING': {
        const d = doc as MarketingDocument;
        return {
          ...base,
          last_name: d.last_name,
        } as MarketingUser;
      }
      case 'SUPPORT': {
        const d = doc as SupportDocument;
        return {
          ...base,
          last_name: d.last_name,
        } as SupportUser;
      }
      case 'FINANCES': {
        const d = doc as FinancesDocument;
        return {
          ...base,
          last_name: d.last_name,
        } as FinancesUser;
      }
      default:
        return base as User;
    }
  }
}
