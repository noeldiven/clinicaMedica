import { Router } from "express";
import {
  crearPaciente,
  listarPacientes,
  obtenerPacientePorId,
} from "../controllers/paciente.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { autorizarRol } from "../middlewares/role.middleware.js";

const router: Router = Router();

router.post(
  "/",
  verificarToken,
  autorizarRol("RECEPCIONISTA"),
  crearPaciente,
);

router.get(
  "/",
  verificarToken,
  autorizarRol("RECEPCIONISTA"),
  listarPacientes,
);

router.get(
  "/:id",
  verificarToken,
  autorizarRol("RECEPCIONISTA"),
  obtenerPacientePorId,
);

export default router;