import { Model } from "mongoose"
import { Game } from "./game.type"


export type Monster = {
    id?: String
    name: String
    mostWeak: String
    lessWeak?: String
    size: Number
    body: String

}
export type MonsterModel = Model<Monster>