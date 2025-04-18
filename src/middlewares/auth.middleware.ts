import { Request, Response, NextFunction } from "express";
import { extractFromJwt } from "../utils/auth/jwtAuth";
import Boom from "@hapi/boom";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) return next(Boom.unauthorized("Token requerido"));

  const decoded = extractFromJwt(token);
  if (!decoded) return next(Boom.unauthorized("Token inválido"));

  req.user = decoded; // Añade esta línea
  next();
};