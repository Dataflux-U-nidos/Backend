import { IUserRepository } from '../../../domain';

export class AddSupportToAdminUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(adminId: string, supportId: string): Promise<void> {
    return this.repo.addSupportToAdmin(adminId, supportId);
  }
}
