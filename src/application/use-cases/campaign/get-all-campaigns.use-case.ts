// src/application/use-cases/campaign/get-all-campaigns.use-case.ts
import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import { CampaignResponseDto } from '../../dtos/campaign.dto';

export class GetAllCampaignsUseCase {
  constructor(private readonly repo: ICampaignRepository) {}
  public async execute(): Promise<CampaignResponseDto[]> {
    return this.repo.findAll();
  }
}
