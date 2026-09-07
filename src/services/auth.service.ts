import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const registrarUsuario = async (
  email: string,
  password: string,
  role: "RECEPCIONISTA" | "MEDICO" | "GERENCIA",
) => {
  const passwordEncriptada = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: passwordEncriptada,
      role,
    },
  });
};

export const iniciarSesion = async (
  email: string,
  password: string,
) => {
  const usuario = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!usuario) {
    return null;
  }

  const passwordCorrecta = await bcrypt.compare(
    password,
    usuario.password,
  );

  if (!passwordCorrecta) {
    return null;
  }

  return usuario;
};