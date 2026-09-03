import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API Clínica Salud Integral funcionando"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});