import prisma from "../config/prisma.js";

export const crearCita = async (datos: {
  pacienteId: number;
  medicoId: number;
  fechaHora: Date;
  motivoConsulta?: string | undefined;
}) => {
  const paciente = await prisma.paciente.findUnique({
    where: {
      id: datos.pacienteId,
    },
  });

  if (!paciente) {
    return {
      estado: "PACIENTE_NO_ENCONTRADO",
    };
  }

  const medico = await prisma.medico.findUnique({
    where: {
      id: datos.medicoId,
    },
  });

  if (!medico) {
    return {
      estado: "MEDICO_NO_ENCONTRADO",
    };
  }

  const citaProgramada = await prisma.cita.findFirst({
    where: {
      pacienteId: datos.pacienteId,
      estado: "PROGRAMADA",
      medico: {
        especialidadId: medico.especialidadId,
      },
    },
  });

  if (citaProgramada) {
    return {
      estado: "CITA_DUPLICADA",
    };
  }

  const cita = await prisma.cita.create({
    data: {
      pacienteId: datos.pacienteId,
      medicoId: datos.medicoId,
      fechaHora: datos.fechaHora,
      motivoConsulta: datos.motivoConsulta ?? null,
    },
  });

  return {
    estado: "CREADA",
    cita,
  };
};

export const cambiarEstadoCita = async (
  id: number,
  estado: "COMPLETADA" | "CANCELADA",
) => {
  try {
    const cita = await prisma.cita.update({
      where: {
        id,
      },
      data: {
        estado,
      },
    });

    return {
      estado: "ACTUALIZADA",
      cita,
    };
  } catch (error) {
    return {
      estado: "CITA_NO_ENCONTRADA",
    };
  }
};