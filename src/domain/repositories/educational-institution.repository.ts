import { EducationalInstitution } from "../entities/educational-institution.entity";

export interface IEducationalInstitutionRepository {
  findAll(): Promise<EducationalInstitution[]>;
  findById(id: string): Promise<EducationalInstitution | null>;
  create(data: Omit<EducationalInstitution, '_id'>): Promise<EducationalInstitution>;
  update(id: string, data: Partial<Omit<EducationalInstitution, '_id'>>): Promise<EducationalInstitution | null>;
  delete(id: string): Promise<boolean>;
}
