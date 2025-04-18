// src/domain/entities/user.entity.ts
export type UserType =
  | 'ADMIN'
  | 'STUDENT'
  | 'VIEWER'
  | 'TUTOR'
  | 'UNIVERSITY'
  | 'INFOMANAGER';

export interface BaseUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}

// Para el STUDENT, se agregan atributos específicos.
export interface StudentUser extends BaseUser {
  type: 'STUDENT';
  locality: string;
  school: string;
  preferences: Record<string, unknown>;
}

export interface TutorUser extends BaseUser {
  type: 'TUTOR';
  students: string[];
}

export interface UniversityUser extends BaseUser {
  type: 'UNIVERSITY';
  infomanagers: string[];
  viewers: string[];
}

// Si los tipos "ADMIN" y "VIEWER" tienen la misma estructura, se usa BaseUser
export type User = BaseUser | StudentUser | TutorUser | UniversityUser;
