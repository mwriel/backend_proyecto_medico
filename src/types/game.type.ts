import { Model } from "mongoose"
import { Monster } from "./monster.type"


export type Game = {
    id?: String
    name: String
    gen: Number
    monster?: Monster[]
}
export type GameModel = Model<Game>
export type GameInput={
    game:String,
    monster:String
}