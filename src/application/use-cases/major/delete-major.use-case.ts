import { MajorRepository } from '../../../infrastructure';

export class DeleteMajorUseCase {
  constructor(private readonly majorRepository: MajorRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.majorRepository.delete(id);
  }
}
