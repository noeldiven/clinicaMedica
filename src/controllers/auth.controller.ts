import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  registrarUsuario,
  iniciarSesion,
} from "../services/auth.service.js";

export const registrar = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      mensaje: "Email, password y role son obligatorios",
    });
  }

  try {
    const usuario = await registrarUsuario(email, password, role);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al registrar el usuario",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      mensaje: "Email y password son obligatorios",
    });
  }

  try {
    const usuario = await iniciarSesion(email, password);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Email o password incorrectos",
      });
    }

    const secreto = process.env.JWT_SECRET;

    if (!secreto) {
      return res.status(500).json({
        mensaje: "JWT_SECRET no configurado",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role,
      },
      secreto,
      {
        expiresIn: "8h",
      },
    );

    return res.json({
      mensaje: "Login exitoso",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};