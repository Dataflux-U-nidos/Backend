import { Router } from 'express';
import { PsychometricUseCase, VocationalUseCase, VocationalPartialUseCase } from '../../application/';
import { StudentTestController } from '../../presentation/controllers/';

const router = Router();

const psychometricUseCase = new PsychometricUseCase();
const vocationalUseCase = new VocationalUseCase();
const vocationalPartialUseCase = new VocationalPartialUseCase();

const studentTestController = new StudentTestController(
    psychometricUseCase,
    vocationalUseCase,
    vocationalPartialUseCase,
);

router.post('/psychometric', studentTestController.recoverPassword);
router.post('/vocational', studentTestController.recoverPassword);
router.post('/vocational-partial', studentTestController.recoverPassword);
export default router;
