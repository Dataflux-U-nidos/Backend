import { EducationalInstitutionRepository } from "../../../infrastructure/database/repositories/educational-institution.repository.Impl";
import { EducationalInstitution } from "../../../domain/entities/educational-institution.entity";

export class GetAllEducationalInstitutionUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(): Promise<EducationalInstitution[]> {
    return this.educationalInstitutionRepository.findAll();
  }
}