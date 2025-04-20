import { UserRepository } from '../repositories/user.repository';
import { User, ToClientUser, CreateUserInput } from '../types/user.type';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
//import { UserModel } from '../models/user.model';

class UserService {
    private users: UserRepository;

    constructor(pool: mysql.Pool) {
        this.users = new UserRepository(pool);
    }

    async create(userInput: CreateUserInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(userInput.password, 10);
        const newUser = await this.users.create({
            id: userInput.id,
            email: userInput.email,
            password_hash: hashedPassword,
            rol: userInput.rol,
            nombre: userInput.nombre,
            apellidos: userInput.apellidos,
            telefono: userInput.telefono ?? null,
            acepto_terminos: userInput.acepto_terminos,
        });
        return newUser;
    }
    

    async findAll(): Promise<ToClientUser[]> {
        const users = await this.users.findAll();
        return users.map(user => ({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            rol: user.rol,
            apellidos: user.apellidos
        }));
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.users.findByEmail(email);
        if (!user) {
            throw boom.notFound('Usuario no encontrado');
        }
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.users.findById(parseInt(id));
        if (!user) {
            throw boom.notFound('Usuario no encontrado');
        }
        return user;
    }

    async findByName(nombre: string): Promise<User> {
        const user = await this.users.findByName(nombre);
        if (!user) {
            throw boom.notFound('Usuario no encontrado');
        }
        return user;
    }

    async findByRol(rol: string): Promise<ToClientUser[]> {
        const users = await this.users.findByRol(rol);
        // console.log('User: ', users);
        return users.map(user => ({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            rol: user.rol,
            apellidos: user.apellidos,
            registro: user.fecha_registro
        }));
    }
    // req.app.locals.db.query('SELECT * FROM medico WHERE usuario_id = ?', [id as string])
    async findByMedico(rol: string): Promise<ToClientUser[]> {
        const users = await this.users.findByMedico(rol);
        // console.log('User: ', users);
        // return users.map(user => ({
        //     id: user.id,
        //     nombre: user.nombre,
        //     email: user.email,
        //     telefono: user.telefono,
        //     rol: user.rol,
        //     apellidos: user.apellidos,
        //     registro: user.fecha_registro
        // }));
        return users;
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        const updatedUser = await this.users.update(parseInt(id), user);
        if (!updatedUser) {
            throw boom.notFound('Usuario no encontrado');
        }
        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        const success = await this.users.delete(parseInt(id));
        if (!success) {
            throw boom.notFound('Usuario no encontrado');
        }
        return success;
    }
}

export default UserService;