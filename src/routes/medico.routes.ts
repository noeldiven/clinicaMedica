import { Router } from "express";
import { listarMedicos,
        listarCitasDelMedico,
        } from "../controllers/medico.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { autorizarRol } from "../middlewares/role.middleware.js";

const router: Router = Router();

router.get(
  "/",
  verificarToken,
  autorizarRol("RECEPCIONISTA"),
  listarMedicos,
);

router.get(
  "/:id/appointments",
  verificarToken,
  autorizarRol("MEDICO"),
  listarCitasDelMedico,
);
export default router;