import { Appointment, AppointmentStatus } from "../types/appointment.type";
import pool from "../../db";
import Boom from "@hapi/boom";
import { AppointmentModel } from "../models/appointment.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

class AppointmentService {

    
    async create(appointment: Omit<Appointment, "id">) {
        const [result] = await pool.query<ResultSetHeader>(
          "INSERT INTO cita SET ?", 
          { ...appointment, estado: "programada" }
        );
        return this.findById(result.insertId);
      }
    
    

      async findById(id: number): Promise<Appointment> {
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT * FROM cita WHERE id = ?", 
          [id]
        );
        if (!rows[0]) throw Boom.notFound("Cita no encontrada");
        return rows[0] as Appointment;
      }

  async cancel(id: number): Promise<Appointment> {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE cita SET estado = ? WHERE id = ?",
      ["cancelada", id]
    );
    
    return this.findById(id);
  }

  // appointment.service.ts
async findByUserId(userId: number): Promise<Appointment[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM cita WHERE paciente_id = ? OR medico_id = ?",
      [userId, userId]
    );
    return rows as Appointment[]; // <-- Casting aquí
  }
}

export default AppointmentService;