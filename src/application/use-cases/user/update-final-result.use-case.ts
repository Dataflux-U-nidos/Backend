import { IUserRepository, User } from '../../../domain';
import { UpdateFinalResultDto } from '../../dtos';

export class UpdateFinalResultUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string, dto: UpdateFinalResultDto): Promise<User> {
    const updated = await this.userRepo.updateFinalResult(userId, dto);
    if (!updated) throw new Error('User not found');
    return updated;
  }
}
