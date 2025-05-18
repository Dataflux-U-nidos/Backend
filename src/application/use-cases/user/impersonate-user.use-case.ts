// src/application/use-cases/user/impersonate-user.use-case.ts
import { JwtTokensDto } from '../../dtos/auth.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { JwtUtils } from '../../../shared/utils/jwt.utils';

export class ImpersonateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  /**
   * Only SUPPORT users may call this.
   * Returns both access & refresh tokens for the target user,
   * embedding { impersonatorId } in the payload.
   */
  async execute(
    impersonatorId: string,
    targetUserId: string,
  ): Promise<JwtTokensDto> {
    const target = await this.userRepo.findById(targetUserId);
    if (!target) throw new Error('User not found');

    // use the same payload shape you use elsewhere:
    const payload = {
      id: target.id,
      type: target.userType,
      impersonatorId,
    };

    // sign both tokens with your config
    const accessToken = JwtUtils.sign(payload);
    const refreshToken = JwtUtils.signRefresh(payload);

    return {
      accessToken,
      refreshToken,
      userType: target.userType,
      userId: target.id,
    };
  }
}
