import { User } from "../schemas/index";

import { v4 as uuidv4 } from "uuid";

class UserService {
  private users: User[] = [];

  // Crear un usuario
  createUser(data: Omit<User, "id" | "createdAt">): User {
    const newUser: User = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  // Obtener todos los usuarios
  getAllUsers(): User[] {
    return this.users;
  }

  // Obtener un usuario por ID
  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // Actualizar un usuario
  updateUser(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt">>
  ): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  // Eliminar un usuario
  deleteUser(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }
}

export default new UserService();
