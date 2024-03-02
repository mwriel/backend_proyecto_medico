import { Model } from "mongoose"


export type Game = {
    id?: String
    name: String
    gen: Number
}
export type GameModel = Model<Game>