import { Major } from '../../domain';

export interface IMajorRepository {
  findAll(): Promise<Major[]>;
  findById(id: string): Promise<Major | null>;
  create(data: Omit<Major, 'id'>): Promise<Major>;
  update(id: string, data: Partial<Omit<Major, 'id'>>): Promise<Major | null>;
  delete(id: string): Promise<boolean>;
}
