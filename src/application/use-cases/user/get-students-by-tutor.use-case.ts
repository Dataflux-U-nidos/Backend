// src/application/use-cases/user/get-students-by-tutor.use-case.ts
import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetStudentsByTutorUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(tutorId: string): Promise<UserResponseDto[]> {
    return this.userRepo.findStudentsByTutor(tutorId);
  }
}
