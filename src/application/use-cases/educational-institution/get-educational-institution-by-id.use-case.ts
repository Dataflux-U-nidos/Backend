import { EducationalInstitutionRepository } from "../../../infrastructure";
import { EducationalInstitution } from "../../../domain";

export class GetEducationalInstitutionByIdUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(id: string): Promise<EducationalInstitution | null> {
    return this.educationalInstitutionRepository.findById(id);
  }
}