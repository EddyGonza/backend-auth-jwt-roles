import express from 'express';
import {
  createUsuarioController,
  getUsuariosController,
  updateUsuarioController,
  deleteUsuarioController
} from '../controllers/usuarios.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/usuarios', createUsuarioController);
router.get('/usuarios', authMiddleware, getUsuariosController);

router.put('/usuarios/:id', authMiddleware, updateUsuarioController);
router.delete('/usuarios/:id', authMiddleware, deleteUsuarioController);

export default router;