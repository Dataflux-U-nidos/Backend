// src/domain/repositories/user.repository.ts
import { PlatformStatsResponseDto } from '../../application/dtos/platform-stats.dto';
import { SatisfactionSurveyResponseDto } from '../../application/dtos/satisfaction-survey.dto';
import {
  UpdateFinalResultDto,
  UpdateTestResultDto,
  UserResponseDto,
} from '../../application/dtos/user.dto';
import { BaseUser, User } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * Retrieve all users matching optional filters.
   * @param filter Optional filters: userType and/or email.
   */
  findAll(filter?: {
    userType?: string; // Cambiar de 'type' a 'userType'
    email?: string;
  }): Promise<UserResponseDto[]>;

  /** Retrieve a single user by ID. */
  findById(id: string): Promise<UserResponseDto | null>;

  /** Retrieve a single user by email. */
  findByEmail(email: string): Promise<User | null>;

  /** Create a new user. */
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;

  findStudentsByTutor(tutorId: string): Promise<UserResponseDto[]>;

  /**
   * Update an existing user.
   * @returns The updated user or null if not found
   */
  update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User | null>;

  /** Update a user by email. */
  updateByEmail(
    email: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<BaseUser | null>;

  /** Delete a user by ID. */

  delete(id: string): Promise<boolean>;

  // Get all users by support Filtering by userType
  findUsersBySupport(
    filter?: {
      userType?: string;
      email?: string;
      search?: string;
    },
    options?: {
      page?: number;
      limit?: number;
    },
  ): Promise<{ items: UserResponseDto[]; total: number }>;

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

  /** ------------new----------- */

  /** Add a marketer ID to an admin's marketer list. */
  addMarketingToAdmin(adminId: string, marketingId: string): Promise<void>;

  /** Add a support ID to an admin's support list. */
  addSupportToAdmin(adminId: string, supportId: string): Promise<void>;

  /** Add a finances ID to an admin's finances list. */
  addFinancesToAdmin(adminId: string, financesId: string): Promise<void>;

  /** Get all marketers associated with a admin. */
  findMarketersByAdmin(adminId: string): Promise<UserResponseDto[]>;

  /** Get all supports associated with a admin. */
  findSupportsByAdmin(adminId: string): Promise<UserResponseDto[]>;

  /** Get all finances associated with a admin. */
  findFinancesByAdmin(adminId: string): Promise<UserResponseDto[]>;

  updateTestResult(
    userId: string,
    data: UpdateTestResultDto,
  ): Promise<User | null>;

  updateFinalResult(
    userId: string,
    data: UpdateFinalResultDto,
  ): Promise<User | null>;

  addSurveyToStudent(studentId: string, surveyId: string): Promise<void>;
  getStudentSurveys(
    studentId: string,
  ): Promise<SatisfactionSurveyResponseDto[]>;

  getPlatformStats(): Promise<PlatformStatsResponseDto>;
}
