// src/application/use-cases/campaign/get-campaign-by-id.use-case.ts
import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import { CampaignResponseDto } from '../../dtos/campaign.dto';

export class GetCampaignByIdUseCase {
  constructor(private readonly repo: ICampaignRepository) {}
  public async execute(id: string): Promise<CampaignResponseDto | null> {
    return this.repo.findById(id);
  }
}
