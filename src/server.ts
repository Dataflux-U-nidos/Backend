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
  authRouter,
} from './presentation/routes';

// Create express application
const app = express();

// Use Middlewares
configureMiddlewares(app);

// Error handler
app.use(errorHandlerMiddleware);

// Routes
app.use(`${config.api.conventionApi}/major`, majorRouter);
app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(
  `${config.api.conventionApi}/educational-institution`,
  educationalInstitutionRouter,
);
app.use(`${config.api.conventionApi}/opportunity`, JobOpportunityRouter);
app.use(`${config.api.conventionApi}/comment`, commentRouter);
app.use(`${config.api.conventionApi}/auth`, authRouter);

// Testing routes
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

let server: ReturnType<typeof app.listen> | null = null;

export { server, app };

const startServer = async () => {
  try {
    await database.connect();
    server = app.listen(config.server.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

// Solo iniciar el servidor si el archivo es ejecutado directamente
if (require.main === module) {
  startServer();
}
