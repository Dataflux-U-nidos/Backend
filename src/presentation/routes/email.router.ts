import { Router } from 'express';
import { EmailController } from '../../presentation/controllers/email.controller';
import {
  SendRecoveryEmailUseCase,
  SendCuestionaryEmailUseCase,
} from '../../application/';
import { UserRepository } from '../../infrastructure/';

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

router.post('/recover', emailController.recoverPassword);
router.post('/cuestionary', emailController.sendCuestionary);

export default router;
