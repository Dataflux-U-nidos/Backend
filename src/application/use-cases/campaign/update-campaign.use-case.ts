// src/application/use-cases/campaign/update-campaign.use-case.ts
import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import {
  UpdateCampaignDto,
  CampaignResponseDto,
} from '../../dtos/campaign.dto';

export class UpdateCampaignUseCase {
  constructor(private readonly repo: ICampaignRepository) {}
  public async execute(
    id: string,
    data: UpdateCampaignDto,
  ): Promise<CampaignResponseDto | null> {
    return this.repo.update(id, data);
  }
}
