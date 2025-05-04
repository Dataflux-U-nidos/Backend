import {
  SubscriptionPlanModel,
  SubscriptionPlanDocument,
} from '../models/subscriptionPlan.model';
import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';
import {
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
  SubscriptionPlanResponseDto,
} from '../../../application/dtos/subscriptionPlan.dto';

export class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
  public async findAll(): Promise<SubscriptionPlanResponseDto[]> {
    const docs = await SubscriptionPlanModel.find().exec();
    return docs.map((d) => this.toDto(d));
  }

  public async findById(
    id: string,
  ): Promise<SubscriptionPlanResponseDto | null> {
    const d = await SubscriptionPlanModel.findById(id).exec();
    return d ? this.toDto(d) : null;
  }

  public async create(
    data: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto> {
    const d = await SubscriptionPlanModel.create(data);
    return this.toDto(d);
  }

  public async update(
    id: string,
    data: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto | null> {
    const d = await SubscriptionPlanModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return d ? this.toDto(d) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const d = await SubscriptionPlanModel.findByIdAndDelete(id).exec();
    return d !== null;
  }

  private toDto(d: SubscriptionPlanDocument): SubscriptionPlanResponseDto {
    return {
      id: d._id.toString(),
      name: d.name,
      description: d.description,
      cost: d.cost,
      type: d.type,
      benefits: d.benefits,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    };
  }
}
