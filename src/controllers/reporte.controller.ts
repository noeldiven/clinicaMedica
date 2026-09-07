import type { Request, Response } from "express";
import {
  obtenerCitasPorEspecialidad,
  obtenerCitasPorFecha,
} from "../services/reporte.service.js";
import { fechaReporteSchema } from "../schemas/reporte.schema.js";

export const reporteCitasPorEspecialidad = async (
  _req: Request,
  res: Response,
) => {
  try {
    const reporte = await obtenerCitasPorEspecialidad();

    const resultado = reporte.map((item) => ({
      especialidad: item.especialidad,
      total: Number(item.total),
    }));

    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el reporte",
    });
  }
};

export const reporteCitasPorFecha = async (
  req: Request,
  res: Response,
) => {
  const resultado = fechaReporteSchema.safeParse(req.query);

  if (!resultado.success) {
    return res.status(400).json({
      mensaje: "La fecha no es válida",
      errores: resultado.error.issues,
    });
  }

  try {
    const reporte = await obtenerCitasPorFecha(resultado.data.fecha);

    const completadas =
      reporte.find((item) => item.estado === "COMPLETADA")?._count.id ?? 0;

    const canceladas =
      reporte.find((item) => item.estado === "CANCELADA")?._count.id ?? 0;

    return res.json({
      fecha: resultado.data.fecha,
      completadas,
      canceladas,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el reporte por fecha",
    });
  }
};