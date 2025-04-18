import { IUserRepository } from '../../../domain';

export class AddInfoManagerToUniversityUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(univId: string, managerId: string): Promise<void> {
    return this.repo.addInfoManagerToUniversity(univId, managerId);
  }
}
