import { Request, Response, NextFunction } from "express";
import { createAppointmentSchema } from "../schemas/appointment.schema";
import Boom from "@hapi/boom";

export const validateAppointment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createAppointmentSchema.validate(req.body);
  if (error) {
    next(Boom.badRequest(error.details[0].message));
  }
  next();
};