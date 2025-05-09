import { Router, RequestHandler } from 'express';
import { AuthController } from '../controllers';
import { validateRoleMiddleware } from '../middleware';

const router = Router();
const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.get('/me', (req, res) => authController.getSession(req, res));
router.post('/refresh', (req, res) => authController.refreshToken(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));
router.post(
  '/impersonate',
  validateRoleMiddleware(['SUPPORT']),
  authController.impersonate as unknown as RequestHandler,
);

export default router;
