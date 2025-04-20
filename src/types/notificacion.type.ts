export type NotificacionTipo = "cita" | "recordatorio" | "alerta";

export type Notificacion = {
    id: number;
    usuario_id: number;
    tipo: NotificacionTipo;
    mensaje: string;
    fecha_envio: Date;
    leida: boolean;
};