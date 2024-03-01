import { Model } from "mongoose"

export type User = {
    id: String
    name: String
    pass: String
    email: String
    

}
export type UserModel = Model<User>