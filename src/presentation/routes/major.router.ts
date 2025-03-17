import { Router } from 'express';
import { MajorController } from '../../presentation';
import { MajorRepository } from '../../infrastructure/database/repositories';
import { CreateMajorUseCase,GetAllMajorsUseCase, GetMajorByIdUseCase, UpdateMajorUseCase, DeleteMajorUseCase } from '../../application';

const router = Router();

const majorRepository = new MajorRepository();

const createMajorUseCase = new CreateMajorUseCase(majorRepository);
const getAllMajorsUseCase = new GetAllMajorsUseCase(majorRepository);
const getMajorByIdUseCase = new GetMajorByIdUseCase(majorRepository);
const updateMajorUseCase = new UpdateMajorUseCase(majorRepository);
const deleteMajorUseCase = new DeleteMajorUseCase(majorRepository);

const majorController = new MajorController(
  createMajorUseCase,
  getAllMajorsUseCase,
  getMajorByIdUseCase,
  updateMajorUseCase,
  deleteMajorUseCase
);

router.get('/', majorController.getAll);
router.get('/:id', majorController.getById);
router.post('/', majorController.create);
router.patch('/:id', majorController.update);
router.delete('/:id', majorController.delete);

export default router;
