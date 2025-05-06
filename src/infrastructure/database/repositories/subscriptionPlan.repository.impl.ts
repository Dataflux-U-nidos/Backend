import {
  SubscriptionPlanModel,
  SubscriptionPlanDocument,
} from '../models/subscriptionPlan.model';
import { ISubscriptionPlanRepository } from '../../../domain/repositories/subscriptionPlan.repository';
import {
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
  SubscriptionPlanResponseDto,
  TotalRevenueResponseDto,
  RevenueByPlanResponseDto,
} from '../../../application/dtos/subscriptionPlan.dto';
import { UniversityModel } from '../models';

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

  public async getRevenueByPlanType(
    planType: string,
  ): Promise<RevenueByPlanResponseDto> {
    // Usamos el virtual “universities”
    const plan = await SubscriptionPlanModel.findOne({ type: planType })
      .populate<{
        universities: { _id: string; name: string }[];
      }>('universities', 'name')
      .exec();
    if (!plan) throw new Error('Plan not found');

    const unis = plan.universities || [];
    return {
      planType,
      costPerUnit: plan.cost,
      count: unis.length,
      revenue: plan.cost * unis.length,
      universities: unis.map((u) => ({
        id: u._id.toString(),
        name: u.name,
      })),
    };
  }

  public async getTotalRevenueByPeriod(
    start: Date,
    end: Date,
  ): Promise<TotalRevenueResponseDto> {
    const agg = await UniversityModel.aggregate<{ total: number }>([
      {
        $match: {
          subscriptionPlanId: { $exists: true },
          updatedAt: { $gte: start, $lte: end },
        },
      },
      {
        $lookup: {
          from: 'subscriptionplans',
          localField: 'subscriptionPlanId',
          foreignField: '_id',
          as: 'plan',
        },
      },
      { $unwind: '$plan' },
      {
        $group: {
          _id: null,
          total: { $sum: '$plan.cost' },
        },
      },
    ]);
    return { totalRevenue: agg[0]?.total ?? 0 };
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
