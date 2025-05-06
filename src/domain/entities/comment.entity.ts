export interface Comment {
  id: string; // Ojo: en MongoDB será _id, pero en la capa de dominio podemos llamarlo "id"
  userId: string; // se asocia con user
  majorId: string; // se asocia con major
  text: string;
}

export default Comment;
