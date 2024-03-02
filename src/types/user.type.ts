import { Model } from "mongoose"
import { Request } from 'express'

export type User = ToClientUser & {
    password: string
    createdAt?: Date
    lastModified?: Date
}

export type ToClientUser = {
    id?: string
    name: string
    email: string
    phone: string
}

export type UserRequestType = Request & {
    user: User
}

export type UserMethods = {
    toClient: () => ToClientUser
}
  
export type UserModel = Model<User, {}, UserMethods>