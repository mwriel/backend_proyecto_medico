// appointments/utils/notifier.ts
import nodemailer from "nodemailer";
import { Appointment } from "../types/appointment.type";
import { User } from "../../types/user.type";

export class Notifier {
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  static async sendAppointmentConfirmation(
    appointment: Appointment,
    user: User
  ): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Confirmación de Cita",
      html: `<h1>Cita agendada para ${appointment.fecha_hora}</h1>`
    });
  }
}