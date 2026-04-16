import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 
import { createUsuarioController,getUsuariosController,updateUserRoleController } from "../controllers/usuarios.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";


const router = Router();

router.post("/", createUsuarioController);
router.get("/",authMiddleware,roleMiddleware(["admin"]),getUsuariosController);
router.patch("/:id/rol", authMiddleware,roleMiddleware(["admin"]),updateUserRoleController)

export default router;

