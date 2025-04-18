import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { User,UserRequestType } from '../types/user.type';

export const restrictTo = (roles: string[]) => {
  return (req: UserRequestType, res: Response, next: NextFunction) => {
    const user = req.user as { rol: string };
    if (!user || !roles.includes(user.rol)) {
      return next(boom.forbidden('No tienes permisos para acceder a este recurso'));
    }
    next();
  };
};