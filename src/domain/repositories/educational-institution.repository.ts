import { EducationalInstitution } from "../entities/educational-institution.entity";

export interface EducationalInstitutionRepository {
  create(data: EducationalInstitution): Promise<EducationalInstitution>;
  findById(id: string): Promise<EducationalInstitution | null>;
  findAll(): Promise<EducationalInstitution[]>;
  update(id: string, data: Partial<EducationalInstitution>): Promise<EducationalInstitution | null>;
  delete(id: string): Promise<boolean>;
}
