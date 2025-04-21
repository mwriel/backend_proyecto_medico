import express from "express"
import UserService from '../services/user.service'
import { User, ToClientUser, CreateUserInput } from '../types/user.type'
import Boom from "@hapi/boom"
import passport from 'passport'
import pool from "../db"
import { restrictTo } from "../middlewares/restrict.handler"
//import {UserModel} from "../models/user.model"
const router = express.Router()

const service = new UserService(pool)

router.post('/', async (req, res, next) => {

    try {
        const user: CreateUserInput = req.body
        console.log('usuario', user)
        if (!user.email || !user.nombre || !user.password || !user.telefono || !user.apellidos ||
            !user.acepto_terminos || !user.rol) {
            throw Boom.badRequest("faltan campos")
        }
        const newUser = await service.create(user)
        res.status(201).json(newUser)//{user: newUser.toClient()}
    } catch (error) {
        next(error)
    }

})//post /users

router.get('/',
    passport.authenticate('jwt', { session: false }),
    restrictTo(['admin', 'medico']),
    async (req, res, next) => {
        console.log('email finding')
        try {
            const { email } = req.query
            const user = await service.findByEmail(email as string)
            //const toClient= {name:user.nombre,email:user.email,phone:user.telefono}
            res.status(200).json(user)//{user: user.toClient()}
        } catch (error) {
            next(error)

        }
    })
router.get('/rol', async (req, res, next) => {
    try {
        const { rol } = req.query
        // console.log(rol as string)
        const rows = await service.findByRol(rol as string)
        // console.log("Rows: ", rows);
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
});
router.get('/medico', async (req, res, next) => {
    try {
        const { id } = req.query
        // console.log(id as string)
        const [rows] = await service.findByMedico(id as string)
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:id',
    passport.authenticate('jwt', { session: false }),
    // restrictTo(['admin']), // Solo los administradores pueden eliminar usuarios
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const success = await service.delete(id);

            res.status(200).json({ message: 'Usuario eliminado correctamente.' });
        } catch (error) {
            next(error);
        }
    }
);

// Implementé esta función solo para probar la conexión a la base de datos
router.get('/all',
    async (req, res, next) => {
        console.log('all users')
        try {
            const users = await service.findAll()
            res.status(200).json(users)//{user: user.toClient()}
        } catch (error) {
            next(error)
        }
    }
)
export default router