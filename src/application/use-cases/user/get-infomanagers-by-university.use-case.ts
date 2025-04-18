import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetInfoManagersByUniversityUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(univId: string): Promise<UserResponseDto[]> {
    return this.repo.findInfoManagersByUniversity(univId);
  }
}
