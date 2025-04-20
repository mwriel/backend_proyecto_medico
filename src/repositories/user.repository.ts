import mysql from 'mysql2/promise';
import { User, ToClientUser } from '../types/user.type';

export class UserRepository {
    private pool: mysql.Pool;

    constructor(pool: mysql.Pool) {
        this.pool = pool;
    }

    async findAll(): Promise<User[]> {
        const [rows] = await this.pool.query('SELECT * FROM usuario');
        return rows as User[];
    }

    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await this.pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        console.log(rows[0])
        return rows[0] as User;
        
    }

    async findById(id: number): Promise<User | null> {
        const [rows] = await this.pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        return rows[0] as User;
    }

    async findByName(nombre: string): Promise<User | null> {
        const [rows] = await this.pool.query('SELECT * FROM usuario WHERE nombre = ?', [nombre]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        return rows[0] as User;
    }

    async findByRol(rol: string): Promise<User[]> {
        const [rows] = await this.pool.query('SELECT id, email, rol, nombre, apellidos, telefono, acepto_terminos, DATE_FORMAT(fecha_registro, "%Y-%m-%d %H:%i:%s") AS fecha_registro FROM usuario WHERE rol = ?', [rol]);
        // console.log('User: ', rows as User[]);
        return rows as User[];
    }
    
    async findByMedico(id: string): Promise<User[]> {
        const [rows] = await this.pool.query('SELECT id, cedula_profesional, especialidad, dias_laborables, horario_laboral, direccion_consultorio, coordenadas_consultorio, cedula_validada  FROM medico WHERE usuario_id = ?', [id]);
        // console.log('User: ', rows as User[]);
        return rows as User[];
    }

    async create(user: Omit<User, 'fecha_registro'>): Promise<User> {
        const [result] = await this.pool.query(
            'INSERT INTO usuario (id,email, password_hash, rol, nombre, apellidos, telefono, acepto_terminos) VALUES (?,?, ?, ?, ?, ?, ?, ?)',
            [
                user.id,
                user.email,
                user.password_hash,
                user.rol,
                user.nombre,
                user.apellidos,
                user.telefono,
                user.acepto_terminos ? 1 : 0
            ]
        );
        const insertId = (result as mysql.ResultSetHeader).insertId;
        return {
            ...user,
            id: insertId,
            fecha_registro: new Date() // Aproximación, ya que fecha_registro es DEFAULT_GENERATED
        };
    }

    async update(id: number, user: Partial<User>): Promise<User | null> {
        const [result] = await this.pool.query(
            'UPDATE usuario SET email = ?, password_hash = ?, rol = ?, nombre = ?, apellidos = ?, telefono = ?, acepto_terminos = ? WHERE id = ?',
            [
                user.email,
                user.password_hash,
                user.rol,
                user.nombre,
                user.apellidos,
                user.telefono,
                user.acepto_terminos ? 1 : 0,
                id
            ]
        );
        if ((result as mysql.ResultSetHeader).affectedRows === 0) return null;
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.pool.query('DELETE FROM usuario WHERE id = ?', [id]);
        return (result as mysql.ResultSetHeader).affectedRows > 0;
    }
}