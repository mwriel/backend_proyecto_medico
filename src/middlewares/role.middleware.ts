import { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

export const roleMiddleware = (roles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(Boom.unauthorized("Usuario no autenticado"));

    const userRole = req.user.rol;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return next(Boom.forbidden("Acceso no autorizado"));
    }

    next();
  };
};