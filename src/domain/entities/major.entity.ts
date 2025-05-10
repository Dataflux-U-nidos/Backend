// src/domain/major.ts
export interface Major {
  id: string;
  name: string;
  institutionId: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  description: string;
  pensumLink: string;
  jobOpportunityIds: string[];
  focus: string;
  createdBy?: string;
  preferences: string[];
  createdAt: Date;
  updatedAt: Date;
}
export default Major;
