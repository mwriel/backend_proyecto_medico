import express from "express"
import UserService from '../services/user.service'
import { User,ToClientUser ,CreateUserInput} from '../types/user.type'
import Boom from "@hapi/boom"
import passport from 'passport'
import pool from "../db"
//import { UserModel } from "../models/user.model"
const router= express.Router()

const service=new UserService(pool)

router.post('/', async (req,res,next) => {

    try{
        const user: CreateUserInput =req.body
        console.log('usuario',user)
        if(!user.email ||!user.nombre || !user.password ||!user.telefono ||!user.apellidos||
            !user.acepto_terminos||!user.rol        ){
            throw Boom.badRequest("faltan campos")
        }
        const newUser = await service.create(user)
        
        res.status(201).json(newUser)//{user: newUser.toClient()}
    }catch(error){
    next(error)
    }
    
})//post /users
router.get('/', 
//passport.authenticate('jwt',{session: false}),
async (req,res,next)=>{
    console.log('email finding')
    try{
        const {email}= req.query
        const user = await service.findByEmail(email as string)
        const toClient= {name:user.nombre,email:user.email,phone:user.telefono}
        res.status(200).json(user)//{user: user.toClient()}
    }catch(error){
        next(error)

    }
})
export default router