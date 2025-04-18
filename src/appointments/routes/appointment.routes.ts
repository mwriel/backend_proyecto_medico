import { Router } from "express";
import AppointmentController from "../controllers/appointment.controller";
import { validateAppointment } from "../middlewares/validateAppointment";
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

const router = Router();
const controller = new AppointmentController();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("paciente"),
  validateAppointment,
  controller.create
);

router.get(
  "/user",
  authMiddleware,
  roleMiddleware(["paciente", "medico"]),
  controller.getByUser
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("paciente"),
  controller.cancel
);

export default router;