import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';

export class GetSubscriptionPlanByIdUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute(id: string) {
    return this.repo.findById(id);
  }
}
