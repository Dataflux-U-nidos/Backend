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
} from '../../application/use-cases';
import { validateRoleMiddleware } from '../middleware';
//import { validateRoleMiddleware } from '../middleware';

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

// Controller
const surveyController = new SatisfactionSurveyController(
  createSurveyUseCase,
  getSurveysUseCase,
);

// Routes
router.post(
  '/',
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  surveyController.create,
);

router.get(
  '/students/:studentId',
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'STUDENT']),
  surveyController.getByStudent,
);

export default router;
