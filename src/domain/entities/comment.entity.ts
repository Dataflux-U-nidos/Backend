export interface Comment {
  id: string; // Ojo: en MongoDB será _id, pero en la capa de dominio podemos llamarlo "id"
  userId: string; // se asocia con institution
  text: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default Comment;
