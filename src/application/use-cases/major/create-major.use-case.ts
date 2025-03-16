import { MajorRepository } from '../../../infrastructure';
import { Major } from '../../../domain';

export class CreateMajorUseCase {
  constructor(private readonly majorRepository: MajorRepository) {}

  public async execute(data: Omit<Major, 'id'>): Promise<Major> {
    // Lógica de negocio adicional (si es necesaria) antes de crear
    return this.majorRepository.create(data);
  }
}
