import { IUserRepository } from '../../../domain';

export class AddMarketingToAdminUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(adminId: string, marketingId: string): Promise<void> {
    return this.repo.addMarketingToAdmin(adminId, marketingId);
  }
}
