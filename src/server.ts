import express from 'express';
import dotenv from 'dotenv';
import configureMiddlewares from './presentation/middleware';
import Database from "./infrastructure/database";
import educationalInstitutionRouter from './presentation/routes/educational-institution.router';
import commentRouter from './presentation/routes/comment.router';
import majorRouter from './presentation/routes/major.router';
import userRouter  from './presentation/routes/user.router';

dotenv.config();

const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);

// 2. Routes
app.use('/carreras', majorRouter);
app.use('/usuarios', userRouter);
app.use('/educational-institutions', educationalInstitutionRouter);

app.use('/comment', commentRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando correctamente");
});

const PORT = process.env.PORT ?? 3000;

// Conectar la base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    await Database.connect(); // Ensure DB is connected before starting the server
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer();
