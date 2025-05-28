import { Router } from 'express';
import { EmailController } from '../../presentation/controllers/email.controller';
import {
  SendRecoveryEmailUseCase,
  SendCuestionaryEmailUseCase,
} from '../../application/';
import { UserRepository } from '../../infrastructure/';
import { logRequest } from '../middleware/logRequest';
const router = Router();

const userRepository = new UserRepository();
const sendRecoveryEmailUseCase = new SendRecoveryEmailUseCase(userRepository);
const sendCuestionaryEmailUseCase = new SendCuestionaryEmailUseCase(
  userRepository,
);

const emailController = new EmailController(
  sendRecoveryEmailUseCase,
  sendCuestionaryEmailUseCase,
);

router.post(
  '/recover',
  logRequest('/email/recover', 'POST', 'SendRecoveryEmail'),
  emailController.recoverPassword,
);

router.post(
  '/cuestionary',
  logRequest('/email/cuestionary', 'POST', 'SendCuestionaryEmail'),
  emailController.sendCuestionary,
);

export default router;
