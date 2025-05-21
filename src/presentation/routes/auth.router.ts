// src/routes/auth.routes.ts
import { RequestHandler, Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRoleMiddleware } from '../middleware';
import { logRequest } from '../middleware/logRequest'; // ajusta si está en otra carpeta

const router = Router();
const authController = new AuthController();

// Agregamos logRequest como middleware en cada ruta
router.post(
  '/login',
  logRequest('/login', 'POST', 'Login'),
  authController.login.bind(authController),
);

router.get(
  '/me',
  logRequest('/me', 'GET', 'Get session'),
  authController.getSession.bind(authController),
);

router.post(
  '/refresh',
  logRequest('/refresh', 'POST', 'Refresh token'),
  authController.refreshToken.bind(authController),
);

router.post(
  '/logout',
  logRequest('/logout', 'POST', 'Logout'),
  authController.logout.bind(authController),
);

router.post(
  '/impersonate',
  logRequest('/impersonate', 'POST', 'Impersonate'),
  validateRoleMiddleware(['SUPPORT', 'ADMIN']),
  authController.impersonate.bind(authController) as unknown as RequestHandler,
);

export default router;
