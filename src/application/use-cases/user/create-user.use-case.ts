// src/application/use-cases/user/create-user.use-case.ts
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserDto } from '../../../application';
import argon2 from 'argon2';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserDto): Promise<User> {
    // 1️⃣ Hash the plain-text password
    const hashedPassword = await argon2.hash(data.password);

    // 2️⃣ Build the user object for persistence
    const userToCreate: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      ...data,
      password: hashedPassword,
    } as Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

    // 3️⃣ Delegate creation to the repository
    const createdUser = await this.userRepository.create(userToCreate);

    // 4️⃣ Return the created domain entity
    return createdUser;
  }
}
