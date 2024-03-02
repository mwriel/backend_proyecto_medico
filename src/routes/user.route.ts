import express from "express"
import UserService from '../services/user.service'
import { User } from '../types/user.type'
import Boom from "@hapi/boom"
const router= express.Router()
const service=new UserService()

router.post('/', async (req,res,next) => {

    try{
        const user: User =req.body
        console.log('usuario',user)
        if(!user.email ||!user.name || !user.pass ||!user.phone){
            throw Boom.badRequest()
        }
        const newUser = await service.create(user)

        res.status(201).json(newUser)
    }catch(error){
    next(error)
    }
    
})//post /monster

export default router