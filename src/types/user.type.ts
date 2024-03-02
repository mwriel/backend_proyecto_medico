import { Model } from "mongoose"

export type User = {
    id?: String
    name: String
    pass: String
    email: String
    phone: String
    createdAt?: Date
    lastModified?:Date
    

}
export type UserModel = Model<User>