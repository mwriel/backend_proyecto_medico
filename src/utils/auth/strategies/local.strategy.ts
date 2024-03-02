import {Strategy} from 'passport-local'
import bcrypt from 'bcrypt'
import Boom  from '@hapi/boom'
const options= {userNameField: 'email',paswordField: 'password'}
const LocalStrategy = new Strategy(options,async (email,password,next)=>{
    try{
        //const.user= await service.findByEmail(email)
        //validar contrase;a
    }catch(error){
        next(error,false)
    }
})