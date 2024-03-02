import { Model } from "mongoose"
import { Game } from "./game.type"


export type Monster = {
    id?: String
    name: String
    mostWeak: String
    lessWeak?: String
    size: Number
    body: String
    //ToDo añadir juego por medio de servicios de find para el juego y cambiar te dipo strign a Game
    firtsGame?: String

}
export type MonsterModel = Model<Monster>