import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetViewersByUniversityUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(univId: string): Promise<UserResponseDto[]> {
    return this.repo.findViewersByUniversity(univId);
  }
}
