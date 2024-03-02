import { Schema, model } from "mongoose"
import {User, UserModel} from '../types/user.type'
import { PHONE_NUMBER_REGEX, EMAIL_REGEX } from "../utils/constants"
const Users = new Schema<User,UserModel>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    pass:{
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

export default model('User', Users)