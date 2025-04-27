import { Router } from 'express';
import { EmailController } from '../../presentation/controllers/email.controller';
import { SendRecoveryEmailUseCase } from '../../application/';
import { UserRepository } from '../../infrastructure/';

const router = Router();

// Instancias necesarias
const userRepository = new UserRepository();
const sendRecoveryEmailUseCase = new SendRecoveryEmailUseCase(userRepository);
const emailController = new EmailController(sendRecoveryEmailUseCase);

// Ruta usando el método de la instancia
router.post('/recover', emailController.recoverPassword);

export default router;
