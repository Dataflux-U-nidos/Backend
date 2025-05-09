import { IMajorRepository, Major } from '../../../domain';

export class CreateMajorUseCase {
  constructor(private readonly majorRepository: IMajorRepository) {}

  public async execute(
    data: Omit<Major, 'id'> & { createdBy: string },
  ): Promise<Major> {
    // Lógica de negocio adicional (si es necesaria) antes de crear
    return this.majorRepository.create(data);
  }
}
