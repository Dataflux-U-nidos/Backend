import { EducationalInstitutionRepository } from "../../../infrastructure/database/repositories/educational-institution.repository.Impl";

export class DeleteEducationalInstitutionUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.educationalInstitutionRepository.delete(id);
  }
}