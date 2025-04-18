
import { Request } from 'express'
/*

+-----------------+-----------------------------------+------+-----+-------------------+-------------------+
| Field           | Type                              | Null | Key | Default           | Extra             |
+-----------------+-----------------------------------+------+-----+-------------------+-------------------+
| id              | int                               | NO   | PRI | NULL              | auto_increment    |
| email           | varchar(100)                      | NO   | UNI | NULL              |                   |
| password_hash   | varchar(255)                      | YES  |     | NULL              |                   |
| rol             | enum('admin','medico','paciente') | NO   |     | NULL              |                   |
| nombre          | varchar(50)                       | NO   |     | NULL              |                   |
| apellidos       | varchar(50)                       | NO   |     | NULL              |                   |
| telefono        | varchar(15)                       | YES  |     | NULL              |                   |
| fecha_registro  | datetime                          | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| acepto_terminos | tinyint(1)                        | YES  |     | 0                 |                   |
+-----------------+-----------------------------------+------+-----+-------------------+-------------------+
*/ 
export type User = ToClientUser & {
    password_hash: string
    fecha_registro?: Date //de momento lo dejamos con ? para despues ver como parsear a fecha datetime
    acepto_terminos:Boolean
    password?: string// sin hashear para las estrategias
}

export type ToClientUser = {
    id: Number
    nombre: string
    email: string
    telefono: string
    rol:'admin'|'medico'|'paciente'
    apellidos: string
}

export type UserRequestType = Request & {
    user: User
}

export type UserMethods = {
    toClient: () => ToClientUser
}
export type CreateUserInput = {
    email: string;
    password: string;
    rol: 'admin' | 'medico' | 'paciente';
    nombre: string;
    apellidos: string;
    telefono?: string;
    acepto_terminos: boolean;
};
  
//export type UserModel = Model<User, {}, UserMethods>