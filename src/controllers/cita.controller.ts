import type { Request, Response } from "express";
import { citaSchema } from "../schemas/cita.schema.js";
import { estadoCitaSchema } from "../schemas/estado-cita.schema.js";
import {
  crearCita as crearCitaService,
  cambiarEstadoCita as cambiarEstadoCitaService,
} from "../services/cita.service.js";

export const crearCita = async (req: Request, res: Response) => {
  const resultado = citaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      mensaje: "Datos de la cita no válidos",
      errores: resultado.error.issues,
    });
  }

  try {
    const resultadoCita = await crearCitaService(resultado.data);

    if (resultadoCita.estado === "PACIENTE_NO_ENCONTRADO") {
      return res.status(404).json({
        mensaje: "Paciente no encontrado",
      });
    }

    if (resultadoCita.estado === "MEDICO_NO_ENCONTRADO") {
      return res.status(404).json({
        mensaje: "Médico no encontrado",
      });
    }

    if (resultadoCita.estado === "CITA_DUPLICADA") {
      return res.status(400).json({
        mensaje:
          "El paciente ya tiene una cita programada en esta especialidad",
      });
    }

    return res.status(201).json(resultadoCita.cita);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al crear la cita",
    });
  }
};

export const cambiarEstadoCita = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      mensaje: "El ID de la cita debe ser un número",
    });
  }

  const resultado = estadoCitaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      mensaje: "El estado de la cita no es válido",
      errores: resultado.error.issues,
    });
  }

  try {
    const resultadoCita = await cambiarEstadoCitaService(
      id,
      resultado.data.estado,
    );

    if (resultadoCita.estado === "CITA_NO_ENCONTRADA") {
      return res.status(404).json({
        mensaje: "Cita no encontrada",
      });
    }

    return res.json(resultadoCita.cita);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al cambiar el estado de la cita",
    });
  }
};