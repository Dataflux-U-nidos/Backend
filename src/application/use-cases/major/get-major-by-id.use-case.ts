import { IMajorRepository } from '../../../domain';
import { MajorResponseDto } from '../../dtos';

export class GetMajorByIdUseCase {
  constructor(private readonly majorRepository: IMajorRepository) {}

  public async execute(id: string): Promise<MajorResponseDto | null> {
    return this.majorRepository.findById(id);
  }
}
