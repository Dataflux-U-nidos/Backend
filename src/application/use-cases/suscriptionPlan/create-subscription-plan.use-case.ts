import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';
import { CreateSubscriptionPlanDto } from '../../dtos/subscriptionPlan.dto';

export class CreateSubscriptionPlanUseCase {
  constructor(private readonly repo: ISubscriptionPlanRepository) {}
  public async execute(dto: CreateSubscriptionPlanDto) {
    return this.repo.create(dto);
  }
}
