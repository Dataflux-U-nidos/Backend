import { MajorRepository } from '../../../infrastructure';
import { Major } from '../../../domain';

export class GetAllMajorsUseCase {
  constructor(private readonly majorRepository: MajorRepository) {}

  public async execute(): Promise<Major[]> {
    return this.majorRepository.findAll();
  }
}
