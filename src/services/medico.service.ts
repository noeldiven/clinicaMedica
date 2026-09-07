import prisma from "../config/prisma.js";

export const obtenerMedicos = async (especialidad?: string) => {
  const where = especialidad
    ? {
        especialidad: {
          nombre: especialidad,
        },
      }
    : {};

  return await prisma.medico.findMany({
    where,
    include: {
      especialidad: true,
    },
  });
};

export const obtenerCitasDelMedico = async (
  medicoId: number,
  desde?: Date,
  hasta?: Date,
) => {
  const where = {
    medicoId,
    ...(desde || hasta
      ? {
          fechaHora: {
            ...(desde ? { gte: desde } : {}),
            ...(hasta ? { lte: hasta } : {}),
          },
        }
      : {}),
  };

  return await prisma.cita.findMany({
    where,
    orderBy: {
      fechaHora: "asc",
    },
    include: {
      paciente: true,
    },
  });
};