import { Type, Static } from "@sinclair/typebox";

export const test = Type.String();

export const preferences = Type.Object({
  theme: Type.String(),
  language: Type.String(),
});

export const UserSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String({ minLength: 2 }),
  email: Type.String({ format: "email" }),
  age: Type.Optional(Type.Number({ minimum: 18 })),
  createdAt: Type.String({ format: "date-time" }),
  ...preferences,
});

export type User = Static<typeof UserSchema>;

export default User;
