import type { Request, Response, NextFunction } from "express";

export const autorizarRol = (rolPermitido: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = (req as Request & { usuario?: { role: string } }).usuario;

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no autenticado",
      });
    }

    if (usuario.role !== rolPermitido) {
      return res.status(403).json({
        mensaje: "No tienes permisos para acceder a este recurso",
      });
    }

    next();
  };
};