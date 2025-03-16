import { MajorRepository } from '../../../infrastructure';
import { Major } from '../../../domain';

export class GetMajorByIdUseCase {
  constructor(private readonly majorRepository: MajorRepository) {}

  public async execute(id: string): Promise<Major | null> {
    return this.majorRepository.findById(id);
  }
}
