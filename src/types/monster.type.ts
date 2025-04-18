import { Model } from "mongoose"
import { Game } from "./game.type"


export type Monster = {
    id?: String
    name: String
    weakTo: String[]
    resistantTo?: String[]
    size: Number
    body: String

}
export type MonsterModel = Model<Monster>