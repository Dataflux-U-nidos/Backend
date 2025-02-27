import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Comentamos la parte de conexión a MongoDB
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://prueba123:prueba123@mongo:27017/mydb?authSource=admin';
// export const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log('Conectado a MongoDB correctamente');
//   } catch (error) {
//     console.error('Error conectando a MongoDB:', error);
//     process.exit(1);
//   }
// };

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

const PORT = process.env.PORT || 5000;

// Puedes omitir la conexión y arrancar el servidor directamente:
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
