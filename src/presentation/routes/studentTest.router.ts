import { Router } from 'express';
import {
  PsychometricUseCase,
  VocationalUseCase,
  VocationalPartialUseCase,
  CuestionaryUseCase,
} from '../../application';
import { StudentTestController } from '../controllers';
import { logRequest } from '../middleware/logRequest';

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

router.get(
  '/psychometric',
  logRequest('/psychometric', 'GET', 'Get psychometric test'),
  studentTestController.getPsychometricTest,
);

router.get(
  '/vocational',
  logRequest('/vocational', 'GET', 'Get vocational test'),
  studentTestController.getVocationalTest,
);

router.get(
  '/vocational-partial',
  logRequest('/vocational-partial', 'GET', 'Get partial vocational test'),
  studentTestController.getPartialVocationalTest,
);
router.get('/satisfaction', studentTestController.getCuestionaryTest);

export default router;
