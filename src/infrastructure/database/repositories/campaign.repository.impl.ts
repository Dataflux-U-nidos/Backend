// src/infrastructure/database/repositories/campaign.repository.impl.ts
import { CampaignModel } from '../models/campaign.model';
import { ICampaignRepository } from '../../../domain/repositories/campaign.repository';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  CampaignResponseDto,
  TotalInvestmentResponseDto,
} from '../../../application/dtos/campaign.dto';

export class CampaignRepository implements ICampaignRepository {
  public async findAll(): Promise<CampaignResponseDto[]> {
    const docs = await CampaignModel.find({});
    return docs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      date: doc.date.toISOString(),
      cost: doc.cost,
      type: doc.type,
      createdBy: doc.createdBy.toString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findByUser(userId: string): Promise<CampaignResponseDto[]> {
    const docs = await CampaignModel.find({ createdBy: userId });
    return docs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      date: doc.date.toISOString(),
      cost: doc.cost,
      type: doc.type,
      createdBy: doc.createdBy.toString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findById(id: string): Promise<CampaignResponseDto | null> {
    const doc = await CampaignModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      date: doc.date.toISOString(),
      cost: doc.cost,
      type: doc.type,
      createdBy: doc.createdBy.toString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async create(data: CreateCampaignDto): Promise<CampaignResponseDto> {
    const doc = await CampaignModel.create({
      ...data,
      date: new Date(data.date),
    });
    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      date: doc.date.toISOString(),
      cost: doc.cost,
      type: doc.type,
      createdBy: doc.createdBy.toString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async update(
    id: string,
    data: UpdateCampaignDto,
  ): Promise<CampaignResponseDto | null> {
    const payload: UpdateCampaignDto = { ...data };
    if (data.date) payload.date = new Date(data.date).toISOString();
    const doc = await CampaignModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      date: doc.date.toISOString(),
      cost: doc.cost,
      type: doc.type,
      createdBy: doc.createdBy.toString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await CampaignModel.findByIdAndDelete(id);
    return result !== null;
  }

  public async getTotalInvestment(): Promise<TotalInvestmentResponseDto> {
    const agg = await CampaignModel.aggregate<{ _id: string; total: number }>([
      { $group: { _id: '$type', total: { $sum: '$cost' } } },
    ]);
    const scholarTotal = agg.find((g) => g._id === 'scholar')?.total ?? 0;
    const universityTotal = agg.find((g) => g._id === 'university')?.total ?? 0;
    return {
      scholarTotal,
      universityTotal,
      total: scholarTotal + universityTotal,
    };
  }
}
