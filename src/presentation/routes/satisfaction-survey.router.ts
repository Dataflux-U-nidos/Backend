// src/presentation/routes/satisfaction-survey.router.ts
import { Router } from 'express';
import { SatisfactionSurveyController } from '../controllers';
import {
  SatisfactionSurveyRepository,
  UserRepository,
} from '../../infrastructure/database/repositories';
import {
  CreateSatisfactionSurveyUseCase,
  GetStudentSurveysUseCase,
  GetSurveyStatsUseCase,
} from '../../application/use-cases';
import { validateRoleMiddleware } from '../middleware';
//import { validateRoleMiddleware } from '../middleware';
import { logRequest } from '../middleware/logRequest';

const router = Router();

// Repositories
const surveyRepository = new SatisfactionSurveyRepository();
const userRepository = new UserRepository();

// Use Cases
const createSurveyUseCase = new CreateSatisfactionSurveyUseCase(
  surveyRepository,
  userRepository,
);
const getSurveysUseCase = new GetStudentSurveysUseCase(
  surveyRepository,
  userRepository,
);
const getSurveyStatsUseCase = new GetSurveyStatsUseCase(surveyRepository);

// Controller
const surveyController = new SatisfactionSurveyController(
  createSurveyUseCase,
  getSurveysUseCase,
  getSurveyStatsUseCase,
);

// Routes
router.post(
  '/',
  logRequest('/satisfaction-survey', 'POST', 'CreateSatisfactionSurvey'),
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  surveyController.create,
);

router.get(
  '/students/:studentId',
  logRequest(
    '/satisfaction-survey/students/:studentId',
    'GET',
    'GetStudentSurveys',
  ),
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'STUDENT']),
  surveyController.getByStudent,
);

// src/presentation/routes/satisfaction-survey.router.ts
router.get(
  '/stats',
  logRequest('/satisfaction-survey/stats', 'GET', 'GetSurveyStats'),
  validateRoleMiddleware(['ADMIN']), // Solo admins
  surveyController.getStats,
);

export default router;
