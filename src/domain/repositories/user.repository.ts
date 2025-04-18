// src/domain/repositories/user.repository.ts
import { UserResponseDto } from '../../application/dtos/user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * Retrieve all users matching optional filters.
   * @param filter Optional filters: userType and/or email.
   */
  findAll(filter?: {
    userType?: string;
    email?: string;
  }): Promise<UserResponseDto[]>;

  /** Retrieve a single user by ID. */
  findById(id: string): Promise<UserResponseDto | null>;

  /** Retrieve a single user by email. */
  findByEmail(email: string): Promise<User | null>;

  /** Create a new user. */
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;

  /**
   * Update an existing user.
   * @returns The updated user or null if not found
   */
  update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User | null>;

  /** Delete a user by ID. */
  delete(id: string): Promise<boolean>;

  /** Get all students associated with a given tutor. */
  findStudentsByTutor(tutorId: string): Promise<UserResponseDto[]>;

  /** Add a student ID to a tutor's student list. */
  addStudentToTutor(tutorId: string, studentId: string): Promise<void>;

  /** Add an infomanager ID to a university's infomanager list. */
  addInfoManagerToUniversity(
    universityId: string,
    infomanagerId: string,
  ): Promise<void>;

  /** Add a viewer ID to a university's viewer list. */
  addViewerToUniversity(universityId: string, viewerId: string): Promise<void>;

  /** Get all infomanagers associated with a university. */
  findInfoManagersByUniversity(
    universityId: string,
  ): Promise<UserResponseDto[]>;

  /** Get all viewers associated with a university. */
  findViewersByUniversity(universityId: string): Promise<UserResponseDto[]>;
}
