import { Model } from "mongoose"


export type Monster = {
    id?: String
    name: String
    mostWeak: String
    lessWeak?: String
    size: Number
    body: String

}
export type MonsterModel = Model<Monster>