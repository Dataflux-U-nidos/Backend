import { EducationalInstitutionRepository } from "../../../infrastructure";
import { EducationalInstitution } from "../../../domain";

export class GetAllEducationalInstitutionUseCase {
  constructor(private readonly educationalInstitutionRepository: EducationalInstitutionRepository) {}

  public async execute(): Promise<EducationalInstitution[]> {
    return this.educationalInstitutionRepository.findAll();
  }
}