import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  paciente_id: Joi.number().required(),
  medico_id: Joi.number().required(),
  fecha_hora: Joi.date().min("now").required(),
  duracion_min: Joi.number().min(15).max(60).default(60),
  frecuencia: Joi.string().valid("semanal", "quincenal", "mensual", "indeterminado")
});

export const updateAppointmentSchema = Joi.object({
  fecha_hora: Joi.date().min("now"),
  estado: Joi.string().valid("programada", "completada", "cancelada", "reprogramada")
});