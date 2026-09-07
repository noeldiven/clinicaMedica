import express from "express";
import prisma from "./config/prisma.js";
import pacienteRoutes from "./routes/paciente.routes.js";
import medicoRoutes from "./routes/medico.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";
import citaRoutes from "./routes/cita.routes.js";
//import { verificarToken } from "./middlewares/auth.middleware.js";
//import { autorizarRol } from "./middlewares/role.middleware.js";
import { swaggerDocument, swaggerUi } from "./config/swagger.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.json({ mensaje: "API Clínica Salud Integral funcionando" });
});

app.get("/prisma-test", async (_req, res) => {
  const especialidades = await prisma.especialidad.findMany();

  res.json(especialidades);
});

/*
app.get(
  "/rol-test",
  verificarToken,
  autorizarRol("RECEPCIONISTA"),
  (_req, res) => {
    res.json({
      mensaje: "Tienes acceso como RECEPCIONISTA",
    });
  },
);*/

app.use("/api/patients", pacienteRoutes);
app.use("/api/doctors", medicoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", citaRoutes);
app.use("/api/reports", reporteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});