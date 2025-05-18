// src/routes/auth.routes.ts
import { RequestHandler, Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRoleMiddleware } from '../middleware';

const router = Router();
const authController = new AuthController();

// No inline wrappers – just point at the bound methods:
router.post('/login', authController.login.bind(authController));
router.get('/me', authController.getSession.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.post(
  '/impersonate',
  validateRoleMiddleware(['SUPPORT', 'ADMIN']),
  authController.impersonate.bind(authController) as unknown as RequestHandler,
);

export default router;
