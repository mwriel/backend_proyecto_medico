import mysql from 'mysql2/promise';
import { User, ToClientUser } from '../types/user.type';
import { Patient } from '../types/paciente.type';

export class PatientRepository {
    private pool: mysql.Pool;

    constructor(pool: mysql.Pool) {
        this.pool = pool;
    }

    async findAll(): Promise<Patient[]> {
        const [rows] = await this.pool.query('SELECT * FROM paciente');
        return rows as Patient[];
    }

    async findByEmail(email: string): Promise<Patient | null> {
        const [rows] = await this.pool.query('SELECT * FROM paciente WHERE usuario_id = (select id from usuario where email =?)', [email]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        console.log(rows[0])
        return rows[0] as Patient;
        
    }

    async findById(id: number): Promise<Patient | null> {
        const [rows] = await this.pool.query('SELECT * FROM paciente WHERE id = ?', [id]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        return rows[0] as Patient;
    }

    async findByName(nombre: string): Promise<Patient | null> {
        const [rows] = await this.pool.query('SELECT * FROM paciente WHERE usuario_id = (SELECT id FROM usuario WHERE nombre = ?)', [nombre]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        return rows[0] as Patient;
    }

    async create(patient: Patient): Promise<Patient> {
        const [result] = await this.pool.query(
            'INSERT INTO paciente (id,usuario_id, historial_medico, , bloqueado) VALUES (?,?, ?, ?)',
            [
                patient.id,
                patient.usuario,
                patient.historial,
                patient.blocked ? 1 : 0
            ]
        );
        const insertId = (result as mysql.ResultSetHeader).insertId;
        return {
            id: insertId,
            ...patient
        };
    }

    async update(id: number, patient: Partial<Patient>): Promise<Patient | null> {
        const [result] = await this.pool.query(
            'UPDATE paciente SET historial_medico = ?, bloqueado = ? WHERE id = ?',
            [
                patient.historial,
                patient.blocked ? 1 : 0,
                id
            ]
        );
        if ((result as mysql.ResultSetHeader).affectedRows === 0) return null;
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.pool.query('DELETE FROM paciente WHERE id = ?', [id]);
        return (result as mysql.ResultSetHeader).affectedRows > 0;
    }
}