import { EducationalInstitutionRepository } from "../../../infrastructure/database/repositories/educational-institution.repository.Impl";
import { EducationalInstitution } from "../../../domain/entities/educational-institution.entity";

export class GetEducationalInstitutionByIdUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(id: string): Promise<EducationalInstitution | null> {
    return this.educationalInstitutionRepository.findById(id);
  }
}