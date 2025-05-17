import express from 'express';
import {
  configureMiddlewares,
  errorHandlerMiddleware,
} from './presentation/middleware';
import config from './infrastructure/config';
import { database } from './infrastructure';
import {
  commentRouter,
  majorRouter,
  userRouter,
  JobOpportunityRouter,
  authRouter,
  emailRouter,
  campaignRouter,
  subscriptionPlanRouter,
  studentTestRouter,
} from './presentation/routes';

// Create express application
const app = express();

// Use Middlewares
configureMiddlewares(app);

// Routes
app.use(`${config.api.conventionApi}/major`, majorRouter);
app.use(`${config.api.conventionApi}/email`, emailRouter);
app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(`${config.api.conventionApi}/opportunity`, JobOpportunityRouter);
app.use(`${config.api.conventionApi}/comment`, commentRouter);
app.use(`${config.api.conventionApi}/auth`, authRouter);
app.use(`${config.api.conventionApi}/campaign`, campaignRouter);
app.use(
  `${config.api.conventionApi}/subscription-plan`,
  subscriptionPlanRouter,
);
app.use(`${config.api.conventionApi}/student-test`, studentTestRouter);

// Error handler
app.use(errorHandlerMiddleware);

// Testing routes
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

const startServer = async () => {
  try {
    await database.connect();
    app.listen(config.server.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

// Only start the server if not in a testing environment
if (config.env.nodeEnv !== 'test') {
  startServer();
}

export { app };
