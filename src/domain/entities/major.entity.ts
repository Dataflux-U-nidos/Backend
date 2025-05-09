export interface Major {
  id: string; // Ojo: en MongoDB será _id, pero en la capa de dominio podemos llamarlo "id"
  name: string;
  institutionId: string; // se asocia con institution
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  description: string;
  pensumLink: string;
  jobId: string;
  focus: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Major;
