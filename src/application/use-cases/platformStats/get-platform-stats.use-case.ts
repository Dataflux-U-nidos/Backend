// src/application/use-cases/platformStats/get-platform-stats.use-case.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { PlatformStatsResponseDto } from '../../dtos/platform-stats.dto';

export class GetPlatformStatsUseCase {
  private readonly cache: {
    data: PlatformStatsResponseDto | null;
    lastUpdated: Date;
  } = { data: null, lastUpdated: new Date(0) };

  constructor(private readonly repository: IUserRepository) {}

  async execute(): Promise<PlatformStatsResponseDto> {
    const now = new Date();
    const cacheAge = now.getTime() - this.cache.lastUpdated.getTime();

    if (!this.cache.data || cacheAge > 20000) {
      // 20 segundos
      this.cache.data = await this.repository.getPlatformStats();
      this.cache.lastUpdated = new Date();
    }

    return this.cache.data;
  }
}
