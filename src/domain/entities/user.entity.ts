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
  email: string;
  password: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser extends BaseUser {
  userType: 'ADMIN';
  last_name: string;
}

export interface StudentUser extends BaseUser {
  userType: 'STUDENT';
  last_name: string;
  age: number;
  locality: string;
  school: string;
  preferences: Record<string, unknown>;
}

export interface ViewerUser extends BaseUser {
  userType: 'VIEWER';
  last_name: string;
}

export interface TutorUser extends BaseUser {
  userType: 'TUTOR';
  last_name: string;
  students: string[];
}

export interface UniversityUser extends BaseUser {
  userType: 'UNIVERSITY';
  address: string;
  infomanagers: string[];
  viewers: string[];
}

export interface InfoManagerUser extends BaseUser {
  userType: 'INFOMANAGER';
  last_name: string;
  universityId: string;
}

export type User =
  | AdminUser
  | StudentUser
  | ViewerUser
  | TutorUser
  | UniversityUser
  | InfoManagerUser;
