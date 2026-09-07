import prisma from "../config/prisma.js";

export const obtenerCitasPorEspecialidad = async () => {
  return await prisma.$queryRaw<
    {
      especialidad: string;
      total: bigint;
    }[]
  >`
    SELECT
      e.nombre AS especialidad,
      COUNT(c.id) AS total
    FROM especialidades e
    LEFT JOIN medicos m ON m.especialidad_id = e.id
    LEFT JOIN citas c ON c.medico_id = m.id
    GROUP BY e.id, e.nombre
    ORDER BY e.nombre;
  `;
};

export const obtenerCitasPorFecha = async (fecha: Date) => {
  const inicio = new Date(
    Date.UTC(
      fecha.getUTCFullYear(),
      fecha.getUTCMonth(),
      fecha.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );

  const fin = new Date(
    Date.UTC(
      fecha.getUTCFullYear(),
      fecha.getUTCMonth(),
      fecha.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  return await prisma.cita.groupBy({
    by: ["estado"],
    where: {
      fechaHora: {
        gte: inicio,
        lte: fin,
      },
      estado: {
        in: ["COMPLETADA", "CANCELADA"],
      },
    },
    _count: {
      id: true,
    },
  });
};