import { IMajorRepository, Major } from '../../../domain';

export class UpdateMajorUseCase {
  constructor(private readonly majorRepository: IMajorRepository) {}

  public async execute(
    id: string,
    data: Partial<Omit<Major, 'id'>>,
  ): Promise<Major | null> {
    return this.majorRepository.update(id, data);
  }
}
