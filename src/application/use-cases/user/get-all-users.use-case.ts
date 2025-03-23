import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(filter?: {
    type?: string;
    email?: string;
  }): Promise<UserResponseDto[]> {
    return this.userRepository.findAll(filter);
  }
}
