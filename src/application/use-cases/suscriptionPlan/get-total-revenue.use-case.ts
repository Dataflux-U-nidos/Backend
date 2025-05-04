import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';

export class GetTotalRevenueByPeriodUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute(start: Date, end: Date) {
    return this.repo.getTotalRevenueByPeriod(start, end);
  }
}
