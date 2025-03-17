export interface BaseUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  type: "admin" | "student" | "viewer";
}

// Para el student, se agregan atributos específicos.
export interface StudentUser extends BaseUser {
  type: "student";
  locality: string;
  school: string;
  preferences: Record<string, unknown>;
}

// Si los tipos "admin" y "viewer" tienen la misma estructura,
// basta con usar BaseUser para ellos.
export type User = BaseUser | StudentUser;
