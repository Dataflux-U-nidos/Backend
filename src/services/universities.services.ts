import { University } from "../schemas";

class UniversityService {
  private Universitys: University[] = [];

  // Crear un usuario
  createUniversity(data: Omit<University, "id" | "createdAt">): University {
    const newUniversity: University = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.Universitys.push(newUniversity);
    return newUniversity;
  }

  // Obtener todos los usuarios
  getAllUniversitys(): University[] {
    return this.Universitys;
  }

  // Obtener un usuario por ID
  getUniversityById(id: string): University | undefined {
    return this.Universitys.find((University) => University.id === id);
  }

  // Actualizar un usuario
  updateUniversity(
    id: string,
    data: Partial<Omit<University, "id" | "createdAt">>
  ): University | undefined {
    const index = this.Universitys.findIndex(
      (University) => University.id === id
    );
    if (index === -1) return undefined;

    this.Universitys[index] = { ...this.Universitys[index], ...data };
    return this.Universitys[index];
  }

  // Eliminar un usuario
  deleteUniversity(id: string): boolean {
    const initialLength = this.Universitys.length;
    this.Universitys = this.Universitys.filter(
      (University) => University.id !== id
    );
    return this.Universitys.length < initialLength;
  }
}

export default new UniversityService();
