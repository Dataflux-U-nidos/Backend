export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'BASIC' | 'STANDARD' | 'PREMIUM';
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}
