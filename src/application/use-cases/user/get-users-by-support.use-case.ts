import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetUsersBySupportUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(
    userType?: string,
    search?: string,
    page = 1,
    limit = 10,
  ): Promise<{ items: UserResponseDto[]; total: number }> {
    return this.userRepo.findUsersBySupport(
      { userType, search },
      { page, limit },
    );
  }
}
