import { EducationalInstitutionRepository } from '../../../infrastructure';
import { EducationalInstitution } from '../../../domain';

export class CreateEducationalInstitutionUseCase {
  constructor(
    private educationalInstitutionRepository: EducationalInstitutionRepository,
  ) {}

  public async execute(
    data: Omit<EducationalInstitution, '_id'>,
  ): Promise<EducationalInstitution> {
    return this.educationalInstitutionRepository.create(data);
  }
}
