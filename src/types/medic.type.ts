
import { Request } from 'express'
/*


+-------------------------+-------------+------+-----+---------+-------+
| Field                   | Type        | Null | Key | Default | Extra |
+-------------------------+-------------+------+-----+---------+-------+
| id                      | int         | NO   | PRI | NULL    |       |
| usuario_id              | int         | NO   | UNI | NULL    |       |
| cedula_profesional      | varchar(20) | YES  | UNI | NULL    |       |
| especialidad            | varchar(50) | YES  |     | NULL    |       |
| horario_disponible      | longtext    | YES  |     | NULL    |       |
| direccion_consultorio   | text        | YES  |     | NULL    |       |
| coordenadas_consultorio | point       | YES  |     | NULL    |       |
| cedula_validada         | tinyint(1)  | YES  | MUL | 0       |       |
+-------------------------+-------------+------+-----+---------+-------+
*/ 


export type Medico = {
    id: Number
    userId:Number
    phd?: string
    especiality?: string
    disponible?: string
    dirConsult?: string
    cordConsult?: [Number,Number]
    validPHD?: boolean
}
