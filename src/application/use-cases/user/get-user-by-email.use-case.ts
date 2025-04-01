import { IUserRepository, User } from '../../../domain';

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
