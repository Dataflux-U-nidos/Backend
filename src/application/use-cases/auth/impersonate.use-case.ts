import { AuthService } from '../../services/auth.service';
import { JwtTokensDto } from '../../dtos/auth.dto';

export class ImpersonateUseCase {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async execute(
    userId: string,
    targetUserId: string,
  ): Promise<JwtTokensDto> {
    console.log('ImpersonateUseCase', userId, targetUserId);
    return this.authService.impersonate(userId, targetUserId);
  }
}
