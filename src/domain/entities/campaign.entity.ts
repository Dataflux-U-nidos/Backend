// src/domain/entities/campaign.entity.ts
export interface Campaign {
  id: string;
  name: string;
  description: string;
  date: Date;
  cost: number;
  type: 'scholar' | 'university';
  createdBy: string;
}
