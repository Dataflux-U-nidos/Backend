import { IUserRepository } from '../../../domain';

export class AddStudentToTutorUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(tutorId: string, studentId: string): Promise<void> {
    await this.userRepo.addStudentToTutor(tutorId, studentId);
  }
}
