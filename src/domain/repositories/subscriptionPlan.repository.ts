import {
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
  SubscriptionPlanResponseDto,
} from '../../application/dtos/subscriptionPlan.dto';

export interface ISubscriptionPlanRepository {
  findAll(): Promise<SubscriptionPlanResponseDto[]>;
  findById(id: string): Promise<SubscriptionPlanResponseDto | null>;
  create(data: CreateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
  update(
    id: string,
    data: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto | null>;
  delete(id: string): Promise<boolean>;
}
