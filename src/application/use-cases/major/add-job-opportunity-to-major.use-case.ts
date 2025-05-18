// src/application/use-cases/AddJobOpportunityToMajorUseCase.ts
import { IMajorRepository } from '../../../domain';
import { MajorResponseDto } from '../../dtos';

export class AddJobOpportunityToMajorUseCase {
  constructor(private readonly repo: IMajorRepository) {}

  public async execute(
    majorId: string,
    jobOpportunityId: string,
  ): Promise<MajorResponseDto | null> {
    return this.repo.addJobOpportunity(majorId, jobOpportunityId);
  }
}
