import { IUserRepository } from '../../../domain';
import { UserResponseDto } from '../../dtos';

export class GetFinancesByAdminUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(adminId: string): Promise<UserResponseDto[]> {
    return this.repo.findFinancesByAdmin(adminId);
  }
}
