import { MajorResponseDto } from '../../application';
import { Major } from '../../domain';

export interface IMajorRepository {
  findAll(): Promise<MajorResponseDto[]>;
  findById(id: string): Promise<MajorResponseDto | null>;
  create(data: Omit<Major, 'id'>): Promise<Major>;
  update(id: string, data: Partial<Omit<Major, 'id'>>): Promise<Major | null>;
  delete(id: string): Promise<boolean>;
}
