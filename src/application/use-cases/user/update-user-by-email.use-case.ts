import { IUserRepository, User } from '../../../domain';

export class UpdateUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    email: string,
    data: Partial<Omit<User, 'id'>>
  ): Promise<User | null> {
    return this.userRepository.updateByEmail(email, data);
  }
}
