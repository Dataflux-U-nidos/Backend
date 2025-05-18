import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetUsersBySupportUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(
    userType?: string,
    search?: string,
  ): Promise<UserResponseDto[]> {
    return this.userRepo.findUsersBySupport({ userType, search });
  }
}
