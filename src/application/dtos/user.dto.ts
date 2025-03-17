import { Type, Static } from "@sinclair/typebox";

export const UserTypeEnum = Type.Union([
  Type.Literal("admin"),
  Type.Literal("student"),
  Type.Literal("viewer"),
]);

// Esquema para crear un usuario
export const CreateUserSchema = Type.Object({
  name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  age: Type.Number(),
  type: UserTypeEnum,
  // Campos opcionales para el usuario student
  locality: Type.Optional(Type.String()),
  school: Type.Optional(Type.String()),
  preferences: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
});
export type CreateUserDto = Static<typeof CreateUserSchema>;

// Esquema para actualizar un usuario (todos los campos son opcionales)
export const UpdateUserSchema = Type.Partial(CreateUserSchema);
export type UpdateUserDto = Static<typeof UpdateUserSchema>;

// Esquema para la respuesta de un usuario (se excluye la contraseña, se usa "id" en lugar de "_id")
export const UserResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: "email" }),
  age: Type.Number(),
  type: UserTypeEnum,
  locality: Type.Optional(Type.String()),
  school: Type.Optional(Type.String()),
  preferences: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
});
export type UserResponseDto = Static<typeof UserResponseSchema>;

// Esquema para una lista de usuarios
export const UsersListSchema = Type.Object({
  users: Type.Array(UserResponseSchema),
});
export type UsersListDto = Static<typeof UsersListSchema>;
