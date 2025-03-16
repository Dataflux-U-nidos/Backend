import express from 'express';
import dotenv from 'dotenv';
import configureMiddlewares from './presentation/middleware';
import Database from "./infrastructure/database";
import educationalInstitutionRouter from './presentation/routes/educational-institution.router';


dotenv.config();

const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);

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

app.use('/educational-institutions', educationalInstitutionRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

const PORT = process.env.PORT || 3000;

// Puedes omitir la conexión y arrancar el servidor directamente:
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
