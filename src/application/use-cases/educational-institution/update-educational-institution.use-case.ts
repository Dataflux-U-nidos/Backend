import { EducationalInstitutionRepository } from '../../../infrastructure';
import { EducationalInstitution } from '../../../domain';

export class UpdateEducationalInstitutionUseCase {
  constructor(
    private readonly educationalInstitutionRepository: EducationalInstitutionRepository,
  ) {}

  public async execute(
    id: string,
    data: Partial<Omit<EducationalInstitution, 'id'>>,
  ): Promise<EducationalInstitution | null> {
    return this.educationalInstitutionRepository.update(id, data);
  }
}
