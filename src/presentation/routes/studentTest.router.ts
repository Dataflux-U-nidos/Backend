import { Router } from 'express';
import {
  PsychometricUseCase,
  VocationalUseCase,
  VocationalPartialUseCase,
} from '../../application';
import { StudentTestController } from '../controllers';

const router = Router();

const psychometricUseCase = new PsychometricUseCase();
const vocationalUseCase = new VocationalUseCase();
const vocationalPartialUseCase = new VocationalPartialUseCase();

const studentTestController = new StudentTestController(
  psychometricUseCase,
  vocationalUseCase,
  vocationalPartialUseCase,
);

router.get('/psychometric', studentTestController.getPsychometricTest);
router.get('/vocational', studentTestController.getVocationalTest);
router.get(
  '/vocational-partial',
  studentTestController.getPartialVocationalTest,
);
export default router;
