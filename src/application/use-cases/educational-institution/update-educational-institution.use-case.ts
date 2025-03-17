import { EducationalInstitutionRepository } from "../../../infrastructure/database/repositories/educational-institution.repository.Impl";
import { EducationalInstitution } from "../../../domain/entities/educational-institution.entity";

export class UpdateEducationalInstitutionUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(
    id: string,
    data: Partial<Omit<EducationalInstitution, "id">>
  ): Promise<EducationalInstitution | null> {
    return this.educationalInstitutionRepository.update(id, data);
  }
}
