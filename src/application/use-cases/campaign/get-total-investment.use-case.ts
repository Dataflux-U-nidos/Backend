// src/application/usecases/campaign/get-total-investment.usecase.ts
import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import { TotalInvestmentResponseDto } from '../../dtos/campaign.dto';

export class GetTotalInvestmentUseCase {
  constructor(private readonly repo: ICampaignRepository) {}

  public async execute(): Promise<TotalInvestmentResponseDto> {
    return this.repo.getTotalInvestment();
  }
}
