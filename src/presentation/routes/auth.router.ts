import { Router } from 'express';
import { AuthController } from '../controllers';
import logger from '../../shared/utils/logger';
import { logRequest } from '../middleware/logRequest';

const router = Router();
const authController = new AuthController();

router.post(
  '/login',
  logRequest('/login', 'POST', 'Login'),
  async (req, res) => {
    try {
      await authController.login(req, res);
    } catch (error) {
      logger.error({
        route: '/login',
        method: 'POST',
        msg: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.get(
  '/me',
  logRequest('/me', 'GET', 'Get session'),
  async (req, res) => {
    try {
      await authController.getSession(req, res);
    } catch (error) {
      logger.error({
        route: '/me',
        method: 'GET',
        msg: 'Get session failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.post(
  '/refresh',
  logRequest('/refresh', 'POST', 'Refresh token'),
  async (req, res) => {
    try {
      await authController.refreshToken(req, res);
    } catch (error) {
      logger.error({
        route: '/refresh',
        method: 'POST',
        msg: 'Refresh token failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.post(
  '/logout',
  logRequest('/logout', 'POST', 'Logout'),
  async (req, res) => {
    try {
      await authController.logout(req, res);
    } catch (error) {
      logger.error({
        route: '/logout',
        method: 'POST',
        msg: 'Logout failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
