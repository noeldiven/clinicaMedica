import type { Request, Response } from "express";
import {
  crearPaciente as crearPacienteService,
  obtenerPacientes,
  obtenerPacientePorId as obtenerPacientePorIdService,
} from "../services/paciente.service.js";
import { pacienteSchema } from "../schemas/paciente.schema.js";

export const crearPaciente = async (req: Request, res: Response) => {
  const resultado = pacienteSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      mensaje: "Datos del paciente no válidos",
      errores: resultado.error.issues,
    });
  }

  try {
    const paciente = await crearPacienteService(resultado.data);

    return res.status(201).json(paciente);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al crear el paciente",
    });
  }
};

export const listarPacientes = async (_req: Request, res: Response) => {
  try {
    const pacientes = await obtenerPacientes();

    return res.json(pacientes);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener los pacientes",
    });
  }
};

export const obtenerPacientePorId = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número",
    });
  }

  try {
    const paciente = await obtenerPacientePorIdService(id);

    if (!paciente) {
      return res.status(404).json({
        mensaje: "Paciente no encontrado",
      });
    }

    return res.json(paciente);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el paciente",
    });
  }
};