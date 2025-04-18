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

    async create(user: Omit<User, 'id' | 'fecha_registro'>): Promise<User> {
        const [result] = await this.pool.query(
            'INSERT INTO usuario (email, password_hash, rol, nombre, apellidos, telefono, acepto_terminos) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
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
            id: insertId,
            ...user,
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