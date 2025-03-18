export interface BaseUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  type: 'ADMIN' | 'STUDENT' | 'VIEWER';
}

// Para el STUDENT, se agregan atributos específicos.
export interface StudentUser extends BaseUser {
  type: 'STUDENT';
  locality: string;
  school: string;
  preferences: Record<string, unknown>;
}

// Si los tipos "ADMIN" y "VIEWER" tienen la misma estructura,
// basta con usar BaseUser para ellos.
export type User = BaseUser | StudentUser;
