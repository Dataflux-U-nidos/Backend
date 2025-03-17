import express from 'express';
import {
  configureMiddlewares,
  errorHandlerMiddleware,
} from './presentation/middleware';
import config from './infrastructure/config';
import { database } from './infrastructure';
import {
  educationalInstitutionRouter,
  commentRouter,
  majorRouter,
  userRouter,
  JobOpportunityRouter,
} from './presentation/routes';

// Crear la aplicación Express
const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);

// 2. Routes
app.use(`${config.api.conventionApi}/major`, majorRouter);
app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(
  `${config.api.conventionApi}/educational-institution`,
  educationalInstitutionRouter,
);
app.use(`${config.api.conventionApi}/opportunity`, JobOpportunityRouter);
app.use(`${config.api.conventionApi}/comment`, commentRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

// 3. Middleware para manejo de errores
app.use(errorHandlerMiddleware);

// Conectar la base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    await database.connect(); // Ensure DB is connected before starting the server
    app.listen(config.server.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer();
