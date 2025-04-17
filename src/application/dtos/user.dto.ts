// src/application/dtos/user.dto.ts
import { Type, Static } from '@sinclair/typebox';

export const UserTypeEnum = Type.Union([
  Type.Literal('ADMIN'),
  Type.Literal('STUDENT'),
  Type.Literal('VIEWER'),
  Type.Literal('TUTOR'),
  Type.Literal('UNIVERSITY'),
]);

export const CreateUserSchema = Type.Object({
  name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  age: Type.Number(),
  type: UserTypeEnum,
  // Campos opcionales para el usuario STUDENT
  locality: Type.Optional(Type.String()),
  school: Type.Optional(Type.String()),
  preferences: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  // Campo opcional para el usuario TUTOR
  students: Type.Optional(Type.Array(Type.String({ format: 'uuid' }))),
});
export type CreateUserDto = Static<typeof CreateUserSchema>;

// Esquema para actualizar un usuario (entrada: todos los campos son opcionales)
export const UpdateUserSchema = Type.Partial(CreateUserSchema);
export type UpdateUserDto = Static<typeof UpdateUserSchema>;

// Esquema para la respuesta de un usuario (salida)
export const UserResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  age: Type.Number(),
  type: UserTypeEnum,
  locality: Type.Optional(Type.String()),
  school: Type.Optional(Type.String()),
  preferences: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  students: Type.Optional(Type.Array(Type.String())),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
export type UserResponseDto = Static<typeof UserResponseSchema>;

// Esquema para una lista de usuarios
export const UsersListSchema = Type.Object({
  users: Type.Array(UserResponseSchema),
});
export type UsersListDto = Static<typeof UsersListSchema>;
