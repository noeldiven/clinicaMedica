import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensaje: "Token requerido",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mensaje: "Token requerido",
    });
  }

  try {
    const secreto = process.env.JWT_SECRET;

    if (!secreto) {
      return res.status(500).json({
        mensaje: "JWT_SECRET no configurado",
      });
    }

    const usuario = jwt.verify(token, secreto) as {
      id: number;
      role: string;
    };

    (req as Request & {
      usuario?: { id: number; role: string };
    }).usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado",
    });
  }
};