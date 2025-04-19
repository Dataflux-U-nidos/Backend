import { UserResponseDto } from '../../application';
import { User } from '../../domain';

export interface IUserRepository {
  findAll(filter?: {
    type?: string;
    email?: string;
  }): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, 'id'>): Promise<User>;
  update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null>;
  updateByEmail(
    email: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findStudentsByTutor(tutorId: string): Promise<UserResponseDto[]>;
  addStudentToTutor(tutorId: string, studentId: string): Promise<void>;
  addInfoManagerToUniversity(
    universityId: string,
    infomanagerId: string,
  ): Promise<void>;
  addViewerToUniversity(universityId: string, viewerId: string): Promise<void>;
  findInfoManagersByUniversity(
    universityId: string,
  ): Promise<UserResponseDto[]>;
  findViewersByUniversity(universityId: string): Promise<UserResponseDto[]>;
}
