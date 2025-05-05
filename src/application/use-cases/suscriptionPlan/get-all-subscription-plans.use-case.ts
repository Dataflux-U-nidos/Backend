import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';

export class GetAllSubscriptionPlansUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute() {
    return this.repo.findAll();
  }
}
