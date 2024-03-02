import express from "express"
import UserService from '../services/user.service'
import { User,ToClientUser } from '../types/user.type'
import Boom from "@hapi/boom"
import passport from 'passport'
const router= express.Router()
const service=new UserService()

router.post('/', async (req,res,next) => {

    try{
        const user: User =req.body
        console.log('usuario',user)
        if(!user.email ||!user.name || !user.password ||!user.phone){
            throw Boom.badRequest()
        }
        const newUser = await service.create(user)
        
        res.status(201).json({user: newUser.toClient()})
    }catch(error){
    next(error)
    }
    
})//post /monster
router.get('/', 
passport.authenticate('jwt',{session: false}),
async (req,res,next)=>{
    console.log('email finding')
    try{
        const {email}= req.query
        const user = await service.findByEmail(email as string)
        const toClient= {name:user.name,email:user.email,phone:user.phone}
        res.status(200).json({user: user.toClient()})
    }catch(error){
        next(error)

    }
})
export default router