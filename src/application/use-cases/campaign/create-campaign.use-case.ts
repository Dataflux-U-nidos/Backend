// src/application/use-cases/campaign/create-campaign.use-case.ts

import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import {
  CreateCampaignDto,
  CampaignResponseDto,
} from '../../dtos/campaign.dto';

export class CreateCampaignUseCase {
  constructor(private readonly repo: ICampaignRepository) {}

  public async execute(
    data: CreateCampaignDto,
    createdBy: string,
  ): Promise<CampaignResponseDto> {
    // fusionamos data + createdBy antes de llamar al repo
    return this.repo.create({ ...data, createdBy });
  }
}
