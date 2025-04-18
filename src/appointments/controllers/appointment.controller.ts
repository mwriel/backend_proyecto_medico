import { Request, Response } from "express";
import AppointmentService from "../services/appointment.service";
import Boom from "@hapi/boom";

class AppointmentController {
  private service: AppointmentService;

  constructor() {
    this.service = new AppointmentService();
  }

  async create(req: Request, res: Response) {
    try {
      const cita = await this.service.create(req.body);
      res.status(201).json(cita);
    } catch (error) {
      if (Boom.isBoom(error)) {
        res.status(error.output.statusCode).json(error.output.payload);
      } else {
        res.status(500).json({ message: "Error interno del servidor" });
      }
    }
  }


async getByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.user.id); // Convertir explícitamente
      const citas = await this.service.findByUserId(userId);
      res.status(200).json(citas);
    } catch (error) {
      this.handleError(error, res);
    }
  }

 
private handleError(error: any, res: Response) {
    if (Boom.isBoom(error)) {
      res.status(error.output.statusCode).json(error.output.payload);
    } else {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

 
async cancel(req: Request, res: Response) {
    try {
      const citaId = Number(req.params.id);
      const cita = await this.service.cancel(citaId);
      res.status(200).json(cita);
    } catch (error) {
      this.handleError(error, res);
    }
  }

}

export default AppointmentController;