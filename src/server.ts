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
  emailRouter,
  campaignRouter,
  subscriptionPlanRouter,
  studentTestRouter,
} from './presentation/routes';
import logger from './shared/utils/logger';
// Create express application
const app = express();

// Use Middlewares
configureMiddlewares(app);

// Routes
app.use(`${config.api.conventionApi}/major`, majorRouter);
app.use(`${config.api.conventionApi}/email`, emailRouter);
app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(
  `${config.api.conventionApi}/educational-institution`,
  educationalInstitutionRouter,
);
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

      // 🔁 Logger cada 10 minutos
      const TEN_MINUTES_MS = 1000 * 60 * 10;

      setInterval(() => {
        const uptimeMinutes = Math.floor(process.uptime() / 60);
        const memory = process.memoryUsage();

        logger.info({
          scope: 'heartbeat',
          msg: 'Servidor activo',
          uptimeMinutes,
          memoryMB: (memory.rss / 1024 / 1024).toFixed(2),
          timestamp: new Date().toISOString(),
        });
      }, TEN_MINUTES_MS);
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
