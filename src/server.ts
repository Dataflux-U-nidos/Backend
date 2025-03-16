import express from 'express';
import dotenv from 'dotenv';
import configureMiddlewares from './presentation/middleware';
import Database from "./infrastructure/database";
import educationalInstitutionRouter from './presentation/routes/educational-institution.router';
import majorRouter from './presentation/routes/major.router';

dotenv.config();

const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);

// 2. Routes
app.use('/carreras', majorRouter);

app.use('/educational-institutions', educationalInstitutionRouter);

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
