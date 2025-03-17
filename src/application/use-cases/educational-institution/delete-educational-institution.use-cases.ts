import { EducationalInstitutionRepository } from "../../../infrastructure";

export class DeleteEducationalInstitutionUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.educationalInstitutionRepository.delete(id);
  }
}