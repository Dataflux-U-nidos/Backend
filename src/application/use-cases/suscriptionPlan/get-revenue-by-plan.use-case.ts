import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';

export class GetRevenueByPlanTypeUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute(planType: string) {
    return this.repo.getRevenueByPlanType(planType);
  }
}
