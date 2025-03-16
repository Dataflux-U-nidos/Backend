import { Router } from 'express';
import { EducationalInstitutionController } from '../controllers/educational-institution.controller';
import { EducationalInstitutionRepository } from '../../infrastructure/database/repositories/educational-institution.repository.Impl';
import { CreateEducationalInstitutionUseCase } from '../../application/use-cases/educational-institution/create-educational-institution.use-case';
import { DeleteEducationalInstitutionUseCase } from '../../application/use-cases/educational-institution/delete-educational-institution.use-cases';
import { GetEducationalInstitutionByIdUseCase } from '../../application/use-cases/educational-institution/get-educational-institution-by-id.use-case';
import { UpdateEducationalInstitutionUseCase } from '../../application/use-cases/educational-institution/update-educational-institution.use-case';
import { GetAllEducationalInstitutionUseCase } from '../../application/use-cases/educational-institution/get-all-educational-institution.use-case';


const router = Router();

const educationalInstitutionRepository = new EducationalInstitutionRepository();

const createEducationalInstitutionUseCase = new CreateEducationalInstitutionUseCase(educationalInstitutionRepository);
const getAllEducationalInstitutionsUseCase = new GetAllEducationalInstitutionUseCase(educationalInstitutionRepository);
const getEducationalInstitutionByIdUseCase = new GetEducationalInstitutionByIdUseCase(educationalInstitutionRepository);
const updateEducationalInstitutionUseCase = new UpdateEducationalInstitutionUseCase(educationalInstitutionRepository);
const deleteEducationalInstitutionUseCase = new DeleteEducationalInstitutionUseCase(educationalInstitutionRepository);

const educationalInstitutionController = new EducationalInstitutionController(
  createEducationalInstitutionUseCase,
  getAllEducationalInstitutionsUseCase,
  getEducationalInstitutionByIdUseCase,
  updateEducationalInstitutionUseCase,
  deleteEducationalInstitutionUseCase
);

router.get('/', educationalInstitutionController.getAll);
router.get('/:id', educationalInstitutionController.getById);
router.post('/', educationalInstitutionController.create);
router.patch('/:id', educationalInstitutionController.update);
router.delete('/:id', educationalInstitutionController.delete);

export default router;