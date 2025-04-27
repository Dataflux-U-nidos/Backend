import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import { CampaignResponseDto } from '../../dtos/campaign.dto';

export class GetCampaignsByUserUseCase {
  constructor(private readonly repo: ICampaignRepository) {}

  public async execute(userId: string): Promise<CampaignResponseDto[]> {
    return this.repo.findByUser(userId);
  }
}
