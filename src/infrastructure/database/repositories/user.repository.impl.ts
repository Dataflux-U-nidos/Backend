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
  MarketingUser,
  SupportUser,
  FinancesUser,
} from '../../../domain/entities/user.entity';
import {
  UpdateFinalResultDto,
  UpdateTestResultDto,
  UserResponseDto,
} from '../../../application/dtos/user.dto';
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
import { SatisfactionSurveyResponseDto } from '../../../application/dtos/satisfaction-survey.dto';
import { PlatformStatsResponseDto } from '../../../application/dtos/platform-stats.dto';

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

type Metric = 'le' | 'ma' | 'ci' | 'cc' | 'idi' | 'ar';

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
    console.log('doc', doc);
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

  // user.repository.impl.ts (o donde tengas tu update)
  public async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User | null> {
    // 1. Cargo el doc “base” solo para saber el tipo
    const baseDoc = await UserBaseModel.findById(id).select('userType').exec();
    if (!baseDoc) return null;

    // 2. Elijo el Model correcto (VIEWER, TUTOR, etc.) según lo que ya está guardado
    const Model = this.getUserModelByType(baseDoc.userType ?? ''); // Provide a default value or handle undefined

    // 3. Cargo de nuevo (o reutiliza baseDoc con lean=false) el documento completo usando el discriminator
    const doc = await (Model as typeof UserBaseModel).findById(id).exec();
    if (!doc) return null;

    // 4. Asigno los campos entrantes
    Object.assign(doc, data);

    // 5. Salvo la instancia: aquí Mongoose usa el esquema hijo y mete last_name, department, lo que toque
    const updated = await doc.save();
    return this.mapEntity(updated);
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

  // Find all users by support filtering by userType
  public async findUsersBySupport(
    filter?: { userType?: string; search?: string },
    options?: { page?: number; limit?: number },
  ): Promise<{ items: UserResponseDto[]; total: number }> {
    const mongoFilter: Record<string, unknown> = {};

    if (filter?.userType) {
      mongoFilter.userType = filter.userType;
    }
    if (filter?.search) {
      const re = new RegExp(filter.search, 'i');
      mongoFilter.$or = [{ email: re }, { name: re }, { last_name: re }];
    }

    const page = options?.page && options.page > 0 ? options.page : 1;
    const limit = options?.limit && options.limit > 0 ? options.limit : 10;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      UserBaseModel.find(mongoFilter)
        .skip(skip)
        .limit(limit)
        .populate<{ support: SupportDocument[] }>('support')
        .exec(),
      UserBaseModel.countDocuments(mongoFilter).exec(),
    ]);

    return {
      items: docs.map((doc) => this.mapDoc(doc)),
      total,
    };
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

  private getUserModelByType(userType: string) {
    switch (userType) {
      case 'VIEWER':
        return ViewerModel;
      case 'TUTOR':
        return TutorModel;
      case 'INFOMANAGER':
        return InfoManagerModel;
      case 'STUDENT':
        return StudentModel;
      case 'UNIVERSITY':
        return UniversityModel;
      case 'ADMIN':
        return AdminModel;
      default:
        return UserBaseModel;
    }
  }

  public async addSurveyToStudent(
    studentId: string,
    surveyId: string,
  ): Promise<void> {
    const result = await StudentModel.findByIdAndUpdate(
      studentId,
      { $push: { satisfaction_surveys: surveyId } },
      { new: true, runValidators: true },
    ).exec();

    if (!result) {
      throw new Error('Estudiante no encontrado para actualizar encuestas');
    }
  }

  public async getStudentSurveys(
    studentId: string,
  ): Promise<SatisfactionSurveyResponseDto[]> {
    const student = await StudentModel.findById(studentId)
      .populate({
        path: 'satisfaction_surveys',
        model: 'SatisfactionSurvey',
        select: 'bucket_id date',
      })
      .exec();

    if (!student) return [];

    return student.satisfaction_surveys.map((survey: any) => ({
      id: survey._id.toString(),
      user_id: studentId,
      bucket_id: survey.bucket_id,
      date: survey.date.toISOString(),
      responses: Array.isArray(survey.responses) ? survey.responses : [],
    }));
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
    if ('testCompleted' in doc) base.testCompleted = doc.testCompleted;
    if ('le' in doc) base.le = doc.le;
    if ('ma' in doc) base.ma = doc.ma;
    if ('ci' in doc) base.ci = doc.ci;
    if ('cc' in doc) base.cc = doc.cc;
    if ('idi' in doc) base.idi = doc.idi;
    if ('ar' in doc) base.ar = doc.ar;
    if ('students' in doc && Array.isArray(doc.students))
      base.students = doc.students.map((s) => s.toString());
    if ('zone' in doc) base.zone = doc.zone;
    if ('address' in doc) base.address = doc.address;
    if ('infomanagers' in doc && Array.isArray(doc.infomanagers))
      base.infomanagers = doc.infomanagers.map((s) => s.toString());
    if ('viewers' in doc && Array.isArray(doc.viewers))
      base.viewers = doc.viewers.map((s) => s.toString());
    if ('subscriptionPlanId' in doc && doc.subscriptionPlanId) {
      base.subscriptionPlanId = doc.subscriptionPlanId.toHexString();
    }
    if ('universityId' in doc && doc.universityId)
      base.universityId = doc.universityId.toString();
    if ('marketing' in doc && Array.isArray(doc.marketing))
      base.marketing = doc.marketing.map((s) => s.toString());
    if ('support' in doc && Array.isArray(doc.support))
      base.support = doc.support.map((s) => s.toString());
    if ('finances' in doc && Array.isArray(doc.finances))
      base.finances = doc.finances.map((s) => s.toString());
    if ('testCompleted' in doc) {
      base.testCompleted = doc.testCompleted;
    }
    if ('price_range' in doc) base.price_range = doc.price_range;
    if ('aceptation_difficulty' in doc)
      base.aceptation_difficulty = doc.aceptation_difficulty;
    if ('description' in doc) base.description = doc.description;
    if ('link' in doc) base.link = doc.link;
    if ('events' in doc)
      base.events = doc.events.map((event) => ({
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.date.toISOString(),
      }));
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
          testCompleted: d.testCompleted,
          le: d.le,
          ma: d.ma,
          ci: d.ci,
          cc: d.cc,
          idi: d.idi,
          ar: d.ar,
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
          subscriptionPlanId: d.subscriptionPlanId.toString(),
          zone: d.zone,
          locality: d.locality,
          price_range: d.price_range,
          aceptation_difficulty: d.aceptation_difficulty,
          description: d.description,
          link: d.link,
          events: d.events.map((event) => ({
            name: event.name,
            description: event.description,
            location: event.location,
            date: event.date,
          })),
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

  public async updateTestResult(
    userId: string,
    data: UpdateTestResultDto,
  ): Promise<User | null> {
    // 1) Buscar y castearlo al modelo Student
    const doc = await StudentModel.findById(userId).exec();
    if (!doc) return null;

    // 2) Asignar sólo los campos de test
    const { zone, locality, le, ma, ci, cc, idi, ar } = data;
    doc.zone = zone;
    doc.locality = locality;
    doc.le = le;
    doc.ma = ma;
    doc.ci = ci;
    doc.cc = cc;
    doc.idi = idi;
    doc.ar = ar;

    // 3) Salvar y mapear
    const updated = await doc.save();
    return this.mapEntity(updated);
  }

  public async updateFinalResult(
    userId: string,
    data: UpdateFinalResultDto,
  ): Promise<User | null> {
    const doc = await StudentModel.findById(userId).exec();
    if (!doc) return null;

    // 2) Promedia campo a campo
    doc.le = (doc.le + data.le) / 2;
    doc.ma = (doc.ma + data.ma) / 2;
    doc.ci = (doc.ci + data.ci) / 2;
    doc.cc = (doc.cc + data.cc) / 2;
    doc.idi = (doc.idi + data.idi) / 2;
    doc.ar = (doc.ar + data.ar) / 2;

    // 3) Construye el array de tuplas
    const scores: [Metric, number][] = [
      ['le', doc.le],
      ['ma', doc.ma],
      ['ci', doc.ci],
      ['cc', doc.cc],
      ['idi', doc.idi],
      ['ar', doc.ar],
    ];

    // 4) Ordena una copia y extrae top-2
    const sortedScores = scores
      .slice() // <-- copia para no mutar original
      .sort(([, a], [, b]) => b - a); // <-- ahora ya no da warning
    const top2 = sortedScores.slice(0, 2).map(([metric]) => metric);

    // 5) Actualiza preferences (ahora string[])
    doc.preferences = Array.from(new Set([...doc.preferences, ...top2]));

    // 6) Guarda y mapea
    const updated = await doc.save();
    return this.mapEntity(updated);
  }

  async getPlatformStats(): Promise<PlatformStatsResponseDto> {
    const stats = await UserBaseModel.aggregate([
      {
        $facet: {
          userCounts: [{ $group: { _id: '$userType', count: { $sum: 1 } } }],
          recentRegistrations: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $project: {
                _id: 0,
                userId: { $toString: '$_id' },
                userType: 1,
                createdAt: 1,
              },
            },
          ],
          subscriptionStats: [
            {
              $match: {
                userType: 'UNIVERSITY',
                subscriptionPlanId: { $exists: true, $ne: null },
              },
            },
            {
              $lookup: {
                from: 'subscriptionplans', // Nombre de colección en minúsculas y plural
                localField: 'subscriptionPlanId',
                foreignField: '_id',
                as: 'subscription',
              },
            },
            {
              $unwind: {
                path: '$subscription',
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $group: {
                _id: '$subscription.type',
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalStudents: {
            $ifNull: [
              {
                $let: {
                  vars: {
                    filtered: {
                      $filter: {
                        input: '$userCounts',
                        as: 'uc',
                        cond: { $eq: ['$$uc._id', 'STUDENT'] },
                      },
                    },
                  },
                  in: { $arrayElemAt: ['$$filtered.count', 0] },
                },
              },
              0,
            ],
          },
          totalUniversities: {
            $ifNull: [
              {
                $let: {
                  vars: {
                    filtered: {
                      $filter: {
                        input: '$userCounts',
                        as: 'uc',
                        cond: { $eq: ['$$uc._id', 'UNIVERSITY'] },
                      },
                    },
                  },
                  in: { $arrayElemAt: ['$$filtered.count', 0] },
                },
              },
              0,
            ],
          },
          totalTutors: {
            $ifNull: [
              {
                $let: {
                  vars: {
                    filtered: {
                      $filter: {
                        input: '$userCounts',
                        as: 'uc',
                        cond: { $eq: ['$$uc._id', 'TUTOR'] },
                      },
                    },
                  },
                  in: { $arrayElemAt: ['$$filtered.count', 0] },
                },
              },
              0,
            ],
          },
          recentRegistrations: 1,
          subscriptionDistribution: {
            $arrayToObject: {
              $map: {
                input: '$subscriptionStats',
                as: 'ss',
                in: {
                  k: {
                    $switch: {
                      branches: [
                        { case: { $eq: ['$$ss._id', 'BASIC'] }, then: 'LOW' },
                        {
                          case: { $eq: ['$$ss._id', 'STANDARD'] },
                          then: 'MEDIUM',
                        },
                        {
                          case: { $eq: ['$$ss._id', 'PREMIUM'] },
                          then: 'HIGH',
                        },
                      ],
                      default: 'NO_SUBSCRIPTION',
                    },
                  },
                  v: '$$ss.count',
                },
              },
            },
          },
        },
      },
    ]);

    return {
      totalStudents: stats[0]?.totalStudents ?? 0,
      totalUniversities: stats[0]?.totalUniversities ?? 0,
      totalTutors: stats[0]?.totalTutors ?? 0,
      activeSubscriptions: await UserBaseModel.countDocuments({
        userType: 'UNIVERSITY',
        subscriptionPlanId: { $exists: true, $ne: null },
      }),
      recentRegistrations: stats[0]?.recentRegistrations ?? [],
      subscriptionDistribution: {
        LOW: stats[0]?.subscriptionDistribution?.LOW ?? 0,
        MEDIUM: stats[0]?.subscriptionDistribution?.MEDIUM ?? 0,
        HIGH: stats[0]?.subscriptionDistribution?.HIGH ?? 0,
      },
    };
  }
}
