import mysql from 'mysql2/promise';
import { User, ToClientUser } from '../types/user.type';
import { Medico } from '../types/medic.type';

export class MedicRepository {
    private pool: mysql.Pool;

    constructor(pool: mysql.Pool) {
        this.pool = pool;
    }

    async findAll(): Promise<Medico[]> {
        const [rows] = await this.pool.query('SELECT * FROM medico');
        return rows as Medico[];
    }

    async findByEmail(email: string): Promise<Medico | null> {
        const [rows] = await this.pool.query('SELECT * FROM medico WHERE usuario_id = (select id from usuario where email = ?)', [email]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        console.log(rows[0])
        return rows[0] as Medico;
        
    }

    async findById(id: number): Promise<Medico | null> {
        const [rows] = await this.pool.query('SELECT * FROM medico WHERE id = ?', [id]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        return rows[0] as Medico;
    }

    async findByName(nombre: string): Promise<Medico | null> {
        const [rows] = await this.pool.query('SELECT * FROM medico WHERE usuario_id =(select id from usuario where nombre = ?)', [nombre]);
        if (Array.isArray(rows) && rows.length === 0) return null;
        return rows[0] as Medico;
    }

    async create(medic: Medico): Promise<Medico> {
        const [result] = await this.pool.query(
            'INSERT INTO medico (id,usuario_id,cedula_profesional,especialidad,horario_disponible,direccion_consultorio,coordenadas_consultorio,cedula_valida) VALUES (?,?, ?, ?, ?, ?, ?,?)',
            [
                medic.id,
                medic.userId,
                medic.phd,
                medic.especiality,
                medic.disponible,
                medic.dirConsult,
                medic.cordConsult,
                medic.validPHD ? 1 : 0
            ]
        );
        const insertId = (result as mysql.ResultSetHeader).insertId;
        return {
            id: insertId,
            ...medic
        };
    }

    async update(id: number, medic: Partial<Medico>): Promise<Medico | null> {
        const [result] = await this.pool.query(
            'UPDATE medico SET usuario_id = ?, cedula_profesional = ?, especialidad = ?, horario_disponible = ?, direccion_consultorio = ?, coordenadas_consultorio = ?, cedula_validada = ? WHERE id = ?',
            [
                medic.userId,
                medic.phd,
                medic.especiality,
                medic.disponible,
                medic.dirConsult,
                medic.cordConsult,
                medic.validPHD ? 1 : 0,
                id
            ]
        );
        if ((result as mysql.ResultSetHeader).affectedRows === 0) return null;
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.pool.query('DELETE FROM medico WHERE id = ?', [id]);
        return (result as mysql.ResultSetHeader).affectedRows > 0;
    }
}