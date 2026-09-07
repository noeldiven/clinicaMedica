import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { autorizarRol } from "../middlewares/role.middleware.js";
import {
  crearCita,
  cambiarEstadoCita,
} from "../controllers/cita.controller.js";

const router: Router = Router();

router.post(
  "/",
  verificarToken,
  autorizarRol("RECEPCIONISTA"),
  crearCita,
);

router.patch(
  "/:id/status",
  verificarToken,
  autorizarRol("MEDICO"),
  cambiarEstadoCita,
);

export default router;