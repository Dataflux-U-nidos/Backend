import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(filter?: {
    userType?: string; // Actualizar nombre del parámetro
    email?: string;
  }): Promise<UserResponseDto[]> {
    return this.userRepository.findAll(filter);
  }
}
