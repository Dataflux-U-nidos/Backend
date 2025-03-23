import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string): Promise<UserResponseDto | null> {
    return this.userRepository.findByEmail(email);
  }
}
