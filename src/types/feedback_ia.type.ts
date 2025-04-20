export type FeedbackEstado = "ESTABLE" | "EN_PELIGRO" | "CRITICO";

export type FeedbackIA = {
    id: number;
    paciente_id: number;
    medico_id: number;
    conversacion: string;
    polaridad?: number | null; // 0-2 según requerimientos
    fecha: Date;
    estado_paciente?: FeedbackEstado;
    disclaimer_aceptado: boolean;
};