export interface Major {
  id: string; // Ojo: en MongoDB será _id, pero en la capa de dominio podemos llamarlo "id"
  name: string;
  institutionId: string; // se asocia con institution
  difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
  price: number;
  description: string;
  pensumLink: string;
  jobId: string;
  focus: string;
  // Se pueden agregar más propiedades si son necesarias.
}

export default Major;
