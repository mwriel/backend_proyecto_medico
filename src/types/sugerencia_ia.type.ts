export type SugerenciaIA = {
    id: number;
    feedback_id: number;     // Relación con feedback_ia
    sugerencia: string;
    fecha: Date;
};