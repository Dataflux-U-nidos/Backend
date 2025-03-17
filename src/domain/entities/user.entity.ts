export interface BaseUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    age: number;
    type: 'administrador' | 'estudiante' | 'visualizador';
  }
  
// Para el estudiante, se agregan atributos específicos.
export interface StudentUser extends BaseUser {
  type: 'estudiante';
  locality: string;
  school: string;
  preferences: Record<string, unknown>;
}

// Si los tipos "administrador" y "visualizador" tienen la misma estructura, 
// basta con usar BaseUser para ellos.
export type User = BaseUser | StudentUser;
  