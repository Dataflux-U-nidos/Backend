import { IUserRepository } from '../../../domain';

export class AddFinancesToAdminUseCase {
  constructor(private readonly repo: IUserRepository) {}
  execute(adminId: string, financesId: string): Promise<void> {
    return this.repo.addFinancesToAdmin(adminId, financesId);
  }
}
