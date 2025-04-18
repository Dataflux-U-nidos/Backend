import { IUserRepository } from '../../../domain';

export class AddViewerToUniversityUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(univId: string, viewerId: string): Promise<void> {
    return this.repo.addViewerToUniversity(univId, viewerId);
  }
}
