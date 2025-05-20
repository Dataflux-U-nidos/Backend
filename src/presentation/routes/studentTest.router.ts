import { Router } from 'express';
import {
  PsychometricUseCase,
  VocationalUseCase,
  VocationalPartialUseCase,
  CuestionaryUseCase,
} from '../../application';
import { StudentTestController } from '../controllers';

const router = Router();

const psychometricUseCase = new PsychometricUseCase();
const vocationalUseCase = new VocationalUseCase();
const vocationalPartialUseCase = new VocationalPartialUseCase();
const cuestionaryUseCase = new CuestionaryUseCase();

const studentTestController = new StudentTestController(
  psychometricUseCase,
  vocationalUseCase,
  vocationalPartialUseCase,
  cuestionaryUseCase,
);

router.get('/psychometric', studentTestController.getPsychometricTest);
router.get('/vocational', studentTestController.getVocationalTest);
router.get(
  '/vocational-partial',
  studentTestController.getPartialVocationalTest,
);
router.get('/satisfaction', studentTestController.getCuestionaryTest);

export default router;
