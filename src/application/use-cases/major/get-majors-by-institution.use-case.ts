import { IMajorRepository } from '../../../domain/repositories/major.repository';
import { Major } from '../../../domain/entities/major.entity';

export class GetMajorsByInstitutionUseCase {
  constructor(private readonly majorRepo: IMajorRepository) {}

  public async execute(institutionId: string): Promise<Major[]> {
    // aquí podrías agregar lógica adicional (validaciones, caché, etc.)
    return this.majorRepo.findByInstitution(institutionId);
  }
}
