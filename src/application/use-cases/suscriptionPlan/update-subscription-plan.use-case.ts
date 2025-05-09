import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';
import { UpdateSubscriptionPlanDto } from '../../dtos/subscriptionPlan.dto';

export class UpdateSubscriptionPlanUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute(id: string, dto: UpdateSubscriptionPlanDto) {
    return this.repo.update(id, dto);
  }
}
