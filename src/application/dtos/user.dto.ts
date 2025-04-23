import { Type, Static } from '@sinclair/typebox';

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
      locality: Type.String(),
      school: Type.String(),
      preferences: Type.Record(Type.String(), Type.Unknown()),
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
      address: Type.String(),
      infomanagers: Type.Array(Type.String({ format: 'uuid' })),
      viewers: Type.Array(Type.String({ format: 'uuid' })),
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
    Type.Object({...BaseFields, last_name: Type.String(),}),
  ],
  { title: 'CreateMarketingDto' },
);

const SupportSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('SUPPORT') }),
    Type.Object({...BaseFields, last_name: Type.String(),}),
  ],
  { title: 'CreateSupportDto' },
);

const FinancesSchema = Type.Intersect(
  [
    Type.Object({ userType: Type.Literal('FINANCES') }),
    Type.Object({...BaseFields, last_name: Type.String(),}),
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
    locality: Type.Optional(Type.String()),
    school: Type.Optional(Type.String()),
    preferences: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    students: Type.Optional(Type.Array(Type.String())),
    address: Type.Optional(Type.String()),
    infomanagers: Type.Optional(Type.Array(Type.String())),
    viewers: Type.Optional(Type.Array(Type.String())),
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
