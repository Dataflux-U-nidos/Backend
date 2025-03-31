import { Router } from 'express';
import { AuthController } from '../controllers';

const router = Router();
const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.get('/me', (req, res) => authController.getSession(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

export default router;
