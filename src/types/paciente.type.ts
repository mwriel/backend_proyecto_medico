/*
+------------------+------------+------+-----+---------+-------+
| Field            | Type       | Null | Key | Default | Extra |
+------------------+------------+------+-----+---------+-------+
| id               | int        | NO   | PRI | NULL    |       |
| usuario_id       | int        | NO   | UNI | NULL    |       |
| historial_medico | text       | YES  |     | NULL    |       |
| bloqueado        | tinyint(1) | YES  |     | 0       |       |
+------------------+------------+------+-----+---------+-------+
*/

import { Request } from 'express'
import { Double } from 'mongoose'

export type Patient ={
    id:number
    usuario:number
    historial?:string
    blocked:boolean
}