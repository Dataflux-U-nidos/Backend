import { IUserRepository, User } from '../../../domain';
import { UpdateTestResultDto } from '../../dtos';

export class UpdateTestResultUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(userId: string, dto: UpdateTestResultDto): Promise<User> {
    const updated = await this.repo.updateTestResult(userId, dto);
    if (!updated) throw new Error('User not found');
    return updated;
  }
}
