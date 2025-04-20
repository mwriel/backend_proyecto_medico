

/*
+----------------+------------------------------------------------------------+------+-----+---------------+----------------+
| Field          | Type                                                       | Null | Key | Default       | Extra          |
+----------------+------------------------------------------------------------+------+-----+---------------+----------------+
| id             | int                                                        | NO   | PRI | NULL          | auto_increment |
| paciente_id    | int                                                        | NO   | MUL | NULL          |         
       |
| medico_id      | int                                                        | NO   | MUL | NULL          |         
       |
| fecha_hora     | datetime                                                   | NO   | MUL | NULL          |                |
| duracion_min   | int                                                        | YES  |     | 60            |                |
| estado         | enum('programada','completada','cancelada','reprogramada') | YES  |     | programada    |                |
| calificacion   | int                                                        | YES  |     | NULL          |                |
| notas_paciente | text                                                       | YES  |     | NULL          |                |
| frecuencia     | enum('semanal','quincenal','mensual','indeterminado')      | YES  | MUL | indeterminado |                |
+----------------+------------------------------------------------------------+------+-----+---------------+----------------+
*/
import { Request } from 'express'
import { Double } from 'mongoose'

export type cita = {
    id:number
    paciente:number
    medico:number
    fecha:Date
    duracionMin?:number
    estado?: 'programada'|'completada'|'cancelada'|'reprogramada'
    rate?: number
    notas?: string
    frecuencia?:'semanal'|'quincenal'|'mensual'|'indeterminado'

}