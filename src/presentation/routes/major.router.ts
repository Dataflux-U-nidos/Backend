import { Router } from 'express';
import { MajorController } from '../../presentation';

const router = Router();

router.get('/', (req, res, next) => {
  MajorController.getAll(req, res, next).catch(next);
});

router.get('/:id', (req, res, next) => {
  MajorController.getById(req, res, next).catch(next);
});

router.post('/', (req, res, next) => {
  MajorController.create(req, res, next).catch(next);
});

router.patch('/:id', (req, res, next) => {
  MajorController.update(req, res, next).catch(next);
});

router.delete('/:id', (req, res, next) => {
  MajorController.delete(req, res, next).catch(next);
});

export default router;
