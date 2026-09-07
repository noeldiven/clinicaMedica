import { Router } from "express";
import {
  reporteCitasPorEspecialidad,
  reporteCitasPorFecha,
} from "../controllers/reporte.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { autorizarRol } from "../middlewares/role.middleware.js";

const router: Router = Router();

router.get(
  "/appointments-by-specialty",
  verificarToken,
  autorizarRol("GERENCIA"),
  reporteCitasPorEspecialidad,
);

router.get(
  "/appointments-by-date",
  verificarToken,
  autorizarRol("GERENCIA"),
  reporteCitasPorFecha,
);

export default router;