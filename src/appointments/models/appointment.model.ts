import { Appointment, AppointmentStatus } from "../types/appointment.type";
import pool from "../../db";
import { RowDataPacket } from "mysql2";

import { ResultSetHeader } from "mysql2";

export class AppointmentModel {
  static async create(appointment: Omit<Appointment, "id">): Promise<Appointment> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO cita SET ?",
      appointment
    );
    return this.findById(result.insertId);
  }

  static async findById(id: number): Promise<Appointment> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM cita WHERE id = ?", 
      [id]
    );
    if (!rows[0]) throw new Error("Cita no encontrada");
    return rows[0] as Appointment; // <-- Casting aquí
  }
}