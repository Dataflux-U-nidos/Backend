import { IMajorRepository } from '../../../domain';

export class DeleteMajorUseCase {
  constructor(private readonly majorRepository: IMajorRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.majorRepository.delete(id);
  }
}
