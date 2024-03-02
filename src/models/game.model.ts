import { Schema, model } from "mongoose"
import { Game,GameModel } from "../types/game.type"

const Monsters = new Schema< Game, GameModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    gen:{
        type: Number,
        required: true,
        trim: true
    }
})

export default model('Monster', Monsters)