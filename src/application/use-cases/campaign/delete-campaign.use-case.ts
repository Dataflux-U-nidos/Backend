// src/application/use-cases/campaign/delete-campaign.use-case.ts
import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';

export class DeleteCampaignUseCase {
  constructor(private readonly repo: ICampaignRepository) {}
  public async execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
