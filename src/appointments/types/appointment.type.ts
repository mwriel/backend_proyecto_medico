export type AppointmentStatus = "programada" | "completada" | "cancelada" | "reprogramada";

export type Appointment = {
  id?: number;
  paciente_id: number;
  medico_id: number;
  fecha_hora: Date;
  duracion_min: number;
  estado: AppointmentStatus;
  calificacion?: number;
  notas_paciente?: string;
  frecuencia?: "semanal" | "quincenal" | "mensual" | "indeterminado";
};

export type HorarioMedico = {
  medico_id: number;
  dias: string[];
  horas: string[];
};