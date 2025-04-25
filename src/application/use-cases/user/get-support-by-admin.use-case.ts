import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetSupportByAdminUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(adminId: string): Promise<UserResponseDto[]> {
    return this.repo.findSupportsByAdmin(adminId);
  }
}
