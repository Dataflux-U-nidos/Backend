import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetUsersBySupportUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(
    userType?: string,
    email?: string,
  ): Promise<UserResponseDto[]> {
    return this.userRepo.findUsersBySupport(userType, email);
  }
}
