import type { Request, Response } from "express";
import {
  obtenerMedicos,
  obtenerCitasDelMedico,
} from "../services/medico.service.js";

export const listarMedicos = async (req: Request, res: Response) => {
  try {
    const especialidad = req.query.specialty;

    const nombreEspecialidad =
      typeof especialidad === "string" ? especialidad : undefined;

    const medicos = await obtenerMedicos(nombreEspecialidad);

    return res.json(medicos);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener los médicos",
    });
  }
};

export const listarCitasDelMedico = async (
  req: Request,
  res: Response,
) => {
  const medicoId = Number(req.params.id);

  if (isNaN(medicoId)) {
    return res.status(400).json({
      mensaje: "El ID del médico debe ser un número",
    });
  }

  const desde =
    typeof req.query.from === "string"
      ? new Date(req.query.from)
      : undefined;

  const hasta =
    typeof req.query.to === "string"
      ? new Date(req.query.to)
      : undefined;

  if (desde && isNaN(desde.getTime())) {
    return res.status(400).json({
      mensaje: "La fecha 'from' no es válida",
    });
  }

  if (hasta && isNaN(hasta.getTime())) {
    return res.status(400).json({
      mensaje: "La fecha 'to' no es válida",
    });
  }

  try {
    const citas = await obtenerCitasDelMedico(
      medicoId,
      desde,
      hasta,
    );

    return res.json(citas);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener las citas del médico",
    });
  }
};