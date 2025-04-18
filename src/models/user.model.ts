
import {User, UserMethods,ToClientUser} from '../types/user.type'
import { PHONE_NUMBER_REGEX, EMAIL_REGEX } from "../utils/constants"


export class UserModel {
    id: number;
    email: string;
    nombre: string
    apellidos: string
    telefono: string
    rol:'admin'|'medico'|'paciente'
    password_hash: string
    fecha_registro?: Date //de momento lo dejamos con ? para despues ver como parsear a fecha datetime
    acepto_terminos:Boolean
    toClient(): ToClientUser {
        return {
            id: this.id,
            email: this.email,
            nombre: this.nombre, 
            telefono: this.telefono, 
            rol: this.rol,
            apellidos: this.apellidos
        };
    }
}