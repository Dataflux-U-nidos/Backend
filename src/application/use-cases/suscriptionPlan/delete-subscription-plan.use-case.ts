import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';

export class DeleteSubscriptionPlanUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute(id: string) {
    return this.repo.delete(id);
  }
}
