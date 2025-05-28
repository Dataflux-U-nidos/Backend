// src/domain/repositories/campaign.repository.ts
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  CampaignResponseDto,
  TotalInvestmentResponseDto,
} from '../../application/dtos/campaign.dto';

export interface ICampaignRepository {
  findAll(): Promise<CampaignResponseDto[]>;
  findById(id: string): Promise<CampaignResponseDto | null>;
  findByUser(userId: string): Promise<CampaignResponseDto[]>;
  create(data: CreateCampaignDto): Promise<CampaignResponseDto>;
  update(
    id: string,
    data: UpdateCampaignDto,
  ): Promise<CampaignResponseDto | null>;
  delete(id: string): Promise<boolean>;
  getTotalInvestment(): Promise<TotalInvestmentResponseDto>;
}
