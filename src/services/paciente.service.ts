import prisma from "../config/prisma.js";

export const crearPaciente = async (datos: {
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string | undefined;
  fechaNacimiento: Date;
}) => {
  return await prisma.paciente.create({
    data: {
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      email: datos.email,
      telefono: datos.telefono ?? null,
      fechaNacimiento: datos.fechaNacimiento,
    },
  });
};

export const obtenerPacientes = async () => {
  return await prisma.paciente.findMany();
};

export const obtenerPacientePorId = async (id: number) => {
  return await prisma.paciente.findUnique({
    where: {
      id,
    },
    include: {
      citas: {
        orderBy: {
          fechaHora: "desc",
        },
        include: {
          medico: {
            include: {
              especialidad: true,
            },
          },
        },
      },
    },
  });
};