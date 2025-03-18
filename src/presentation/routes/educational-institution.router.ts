import { Router } from 'express';
import { EducationalInstitutionController } from '../controllers/educational-institution.controller';
import { EducationalInstitutionRepository } from '../../infrastructure/database/repositories/educational-institution.repository.Impl';
import {
  CreateEducationalInstitutionUseCase,
  GetAllEducationalInstitutionUseCase,
  GetEducationalInstitutionByIdUseCase,
  UpdateEducationalInstitutionUseCase,
  DeleteEducationalInstitutionUseCase,
} from '../../application';

const router = Router();

const educationalInstitutionRepository = new EducationalInstitutionRepository();

const createEducationalInstitutionUseCase =
  new CreateEducationalInstitutionUseCase(educationalInstitutionRepository);
const getAllEducationalInstitutionsUseCase =
  new GetAllEducationalInstitutionUseCase(educationalInstitutionRepository);
const getEducationalInstitutionByIdUseCase =
  new GetEducationalInstitutionByIdUseCase(educationalInstitutionRepository);
const updateEducationalInstitutionUseCase =
  new UpdateEducationalInstitutionUseCase(educationalInstitutionRepository);
const deleteEducationalInstitutionUseCase =
  new DeleteEducationalInstitutionUseCase(educationalInstitutionRepository);

const educationalInstitutionController = new EducationalInstitutionController(
  createEducationalInstitutionUseCase,
  getAllEducationalInstitutionsUseCase,
  getEducationalInstitutionByIdUseCase,
  updateEducationalInstitutionUseCase,
  deleteEducationalInstitutionUseCase,
);

router.get('/', educationalInstitutionController.getAll);
router.get('/:id', educationalInstitutionController.getById);
router.post('/', educationalInstitutionController.create);
router.patch('/:id', educationalInstitutionController.update);
router.delete('/:id', educationalInstitutionController.delete);

export default router;
