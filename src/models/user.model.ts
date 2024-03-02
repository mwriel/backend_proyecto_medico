import { Schema, model } from "mongoose"
import {User, UserMethods, UserModel} from '../types/user.type'
import { PHONE_NUMBER_REGEX, EMAIL_REGEX } from "../utils/constants"
const Users = new Schema<User,UserModel,UserMethods>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        match: [EMAIL_REGEX,'no es valido el email']
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        match: [PHONE_NUMBER_REGEX,'telefono invalido, introduzca correctamente']
    },
    createdAt:{
        type:Date,
        default:()=> Date.now()
    },
    lastModified:{
        type: Date,
        default: ()=> Date.now()
    }
})

Users.methods.toClient = function () {
    return {
      id: this._id as unknown as string,
      name: this.name,
      email: this.email,
      phone: this.phone
      
    }
  }

export default model('User', Users)