export type UserType =
  | 'ADMIN'
  | 'STUDENT'
  | 'VIEWER'
  | 'TUTOR'
  | 'UNIVERSITY'
  | 'INFOMANAGER'
  | 'MARKETING'
  | 'SUPPORT'
  | 'FINANCES';

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
  marketing: string[];
  support: string[];
  finances: string[];
}

export interface StudentUser extends BaseUser {
  userType: 'STUDENT';
  last_name: string;
  age: number;
  zone: string;
  locality: string;
  school: string;
  preferences: string[];
  le: number;
  ma: number;
  ci: number;
  cc: number;
  idi: number;
  ar: number;
}

export interface TutorUser extends BaseUser {
  userType: 'TUTOR';
  students: string[];
}

export interface UniversityUser extends BaseUser {
  userType: 'UNIVERSITY';
  zone: string;
  locality: string;
  infomanagers: string[];
  viewers: string[];
  subscriptionPlanId: string;
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
  zone: string;
  locality: string;
  address: string;
  infomanagers: string[];
  viewers: string[];
}

export interface InfoManagerUser extends BaseUser {
  userType: 'INFOMANAGER';
  last_name: string;
  universityId: string;
}

export interface MarketingUser extends BaseUser {
  userType: 'MARKETING';
  last_name: string;
}

export interface SupportUser extends BaseUser {
  userType: 'SUPPORT';
  last_name: string;
}

export interface FinancesUser extends BaseUser {
  userType: 'FINANCES';
  last_name: string;
}

export type User =
  | AdminUser
  | StudentUser
  | ViewerUser
  | TutorUser
  | UniversityUser
  | InfoManagerUser
  | MarketingUser
  | SupportUser
  | FinancesUser;
