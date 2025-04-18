import { IUserRepository } from '../../../domain';

export class AddStudentToTutorUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(tutorId: string, studentId: string): Promise<void> {
    console.log('AddStudentToTutorUseCase.execute()', tutorId, studentId);
    await this.userRepo.addStudentToTutor(tutorId, studentId);
  }
}
