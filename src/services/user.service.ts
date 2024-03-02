import Users from "../models/user.model"
import { User,UserModel } from "../types/user.type"
import Boom from "@hapi/boom"

class UserService{
    async create(user: User){
        const newUser=await Users.create(user).catch((error) => {
            console.log('couldn\'n create user',error)
        })
        return newUser
    }
    async findAll(){
        
        const users = await Users.find().catch((error) => {
            console.log('error while conecting to mongo',error)
        })
        if(!users[0]){
            throw Boom.notFound('there are no users ')
        }
        return users
    }
    async findByEmail(email:string){
        const user = await Users.find({email:email}).catch((error) => {
            console.log('error retirando info del usuario')
        })
        if(!user){
            throw Boom.notFound('usuario no encontrado')
        }
        return user
    }
    async findById(id:string){
        const user = await Users.findById(id).catch((error) => {
            console.log('error en coneccion a mongo')
        })
        if(!user){
            throw Boom.notFound('usuario no encontrado')
        }
        return user
    }
    async findByName(name:string){
        const user = await Users.findOne({name: name}).catch((error) => {
            console.log('error en coneccion a mongo')
        })
        if(!user){
            throw Boom.notFound('usuario no encontrado')
        }
        return user
    }
}


export default UserService
