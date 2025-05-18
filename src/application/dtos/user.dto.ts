import { Type, Static } from '@sinclair/typebox';

export const EventSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  date: Type.String({ format: 'date-time' }), // ISO 8601
  location: Type.String(),
});

// Enumeración de tipos válida
export const UserTypeEnum = Type.Union(
  [
    Type.Literal('ADMIN'),
    Type.Literal('STUDENT'),
    Type.Literal('VIEWER'),
    Type.Literal('TUTOR'),
    Type.Literal('UNIVERSITY'),
    Type.Literal('INFOMANAGER'),
    Type.Literal('MARKETING'),
    Type.Literal('SUPPORT'),
    Type.Literal('FINANCES'),
  ],
  { title: 'UserTypeEnum' },
);
export type UserType = Static<typeof UserTypeEnum>;

// Campos base para Create
const BaseFields = {
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
};

export const AdminSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('ADMIN') }),
    Type.Object({
      ...BaseFields,
      last_name: Type.String(),
      marketing: Type.Array(Type.String({ format: 'uuid' })),
      support: Type.Array(Type.String({ format: 'uuid' })),
      finances: Type.Array(Type.String({ format: 'uuid' })),
    }),
  ],
  { title: 'CreateAdminDto' },
);

const StudentSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('STUDENT') }),
    Type.Object({
      ...BaseFields,
      last_name: Type.String(),
      age: Type.Number(),
      zone: Type.String(),
      locality: Type.String(),
      school: Type.String(),
      preferences: Type.Optional(Type.Array(Type.String())),
      testCompleted: Type.Optional(Type.Boolean()),
      le: Type.Optional(Type.Number()),
      ma: Type.Optional(Type.Number()),
      ci: Type.Optional(Type.Number()),
      cc: Type.Optional(Type.Number()),
      idi: Type.Optional(Type.Number()),
      ar: Type.Optional(Type.Number()),
    }),
  ],
  { title: 'CreateStudentDto' },
);

const ViewerSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('VIEWER') }),
    Type.Object({ ...BaseFields, last_name: Type.String() }),
  ],
  { title: 'CreateViewerDto' },
);

const TutorSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('TUTOR') }),
    Type.Object({
      ...BaseFields,
      last_name: Type.String(),
      students: Type.Array(Type.String({ format: 'uuid' })),
    }),
  ],
  { title: 'CreateTutorDto' },
);

const UniversitySchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('UNIVERSITY') }),
    Type.Object({
      ...BaseFields,
      zone: Type.String(),
      locality: Type.String(),
      address: Type.String(),
      // Campos migrados de EducationalInstitution (excepto location_l)
      price_range: Type.Union([
        Type.Literal('LOW'),
        Type.Literal('MEDIUM'),
        Type.Literal('HIGH'),
      ]),
      aceptation_difficulty: Type.Union([
        Type.Literal('EASY'),
        Type.Literal('MEDIUM'),
        Type.Literal('HARD'),
      ]),
      description: Type.String(),
      link: Type.String({ format: 'uri' }),
      events: Type.Array(EventSchema),
      infomanagers: Type.Array(Type.String({ format: 'uuid' })),
      viewers: Type.Array(Type.String({ format: 'uuid' })),
      subscriptionPlanId: Type.Optional(Type.String({ format: 'uuid' })),
    }),
  ],
  { title: 'CreateUniversityDto' },
);

const InfoManagerSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('INFOMANAGER') }),
    Type.Object({
      ...BaseFields,
      last_name: Type.String(),
      universityId: Type.String({ format: 'uuid' }),
    }),
  ],
  { title: 'CreateInfoManagerDto' },
);

// Marketing Schema
const MarketingSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('MARKETING') }),
    Type.Object({ ...BaseFields, last_name: Type.String() }),
  ],
  { title: 'CreateMarketingDto' },
);

const SupportSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('SUPPORT') }),
    Type.Object({ ...BaseFields, last_name: Type.String() }),
  ],
  { title: 'CreateSupportDto' },
);

const FinancesSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('FINANCES') }),
    Type.Object({ ...BaseFields, last_name: Type.String() }),
  ],
  { title: 'CreateFinancesDto' },
);

// Unión discriminada por 'userType'
export const CreateUserSchema = Type.Union(
  [
    AdminSchema,
    StudentSchema,
    ViewerSchema,
    TutorSchema,
    UniversitySchema,
    InfoManagerSchema,
    MarketingSchema,
    SupportSchema,
    FinancesSchema,
  ],
  { discriminator: 'userType', title: 'CreateUserDto' },
);
export type CreateUserDto = Static<typeof CreateUserSchema>;

// Update: partial de toda la unión discriminada
export const UpdateUserSchema = Type.Partial(CreateUserSchema);
export type UpdateUserDto = Static<typeof UpdateUserSchema>;

// Response DTO: todos los campos opcionales según tipo
export const UserResponseSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    email: Type.String({ format: 'email' }),
    last_name: Type.Optional(Type.String()),
    age: Type.Optional(Type.Number()),
    userType: UserTypeEnum,
    zone: Type.Optional(Type.String()),
    locality: Type.Optional(Type.String()),
    school: Type.Optional(Type.String()),
    preferences: Type.Optional(Type.Array(Type.String())),
    testCompleted: Type.Optional(Type.Boolean()),
    students: Type.Optional(Type.Array(Type.String())),
    address: Type.Optional(Type.String()),
    infomanagers: Type.Optional(Type.Array(Type.String())),
    viewers: Type.Optional(Type.Array(Type.String())),
    subscriptionPlanId: Type.Optional(Type.String()),
    price_range: Type.Optional(
      Type.Union([
        Type.Literal('LOW'),
        Type.Literal('MEDIUM'),
        Type.Literal('HIGH'),
      ]),
    ),
    aceptation_difficulty: Type.Optional(
      Type.Union([
        Type.Literal('EASY'),
        Type.Literal('MEDIUM'),
        Type.Literal('HARD'),
      ]),
    ),
    description: Type.Optional(Type.String()),
    link: Type.Optional(Type.String({ format: 'uri' })),
    events: Type.Optional(Type.Array(EventSchema)),
    marketing: Type.Optional(Type.Array(Type.String())),
    support: Type.Optional(Type.Array(Type.String())),
    finances: Type.Optional(Type.Array(Type.String())),
    universityId: Type.Optional(Type.String()),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  },
  { title: 'UserResponseDto' },
);
export type UserResponseDto = Static<typeof UserResponseSchema>;

// Lista de usuarios
export const UsersListSchema = Type.Object({
  users: Type.Array(UserResponseSchema),
});
export type UsersListDto = Static<typeof UsersListSchema>;

// application/dtos/user.dto.ts
export class UpdateTestResultDto {
  zone!: string;
  locality!: string;
  le!: number;
  ma!: number;
  ci!: number;
  cc!: number;
  idi!: number;
  ar!: number;
}

// src/application/dtos/user.dto.ts
export class UpdateFinalResultDto {
  le!: number;
  ma!: number;
  ci!: number;
  cc!: number;
  idi!: number;
  ar!: number;
}
