import { EducationalInstitution } from '../../domain';

export interface IEducationalInstitutionRepository {
  findAll(): Promise<EducationalInstitution[]>;
  findById(id: string): Promise<EducationalInstitution | null>;
  create(
    data: Omit<EducationalInstitution, 'id'>,
  ): Promise<EducationalInstitution>;
  update(
    id: string,
    data: Partial<Omit<EducationalInstitution, 'id'>>,
  ): Promise<EducationalInstitution | null>;
  delete(id: string): Promise<boolean>;
}
