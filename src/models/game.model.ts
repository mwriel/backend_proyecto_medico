import { Schema, model } from "mongoose"
import { Game,GameModel } from "../types/game.type"
import { MONSTER_REFERENCE } from "./monster.model"

export const GAME_REFERENCE='Game'
const Games = new Schema< Game, GameModel>({
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
    },
    monster:{
        type: Schema.Types.ObjectId,
        ref: MONSTER_REFERENCE
        
    }
})

export default model(GAME_REFERENCE, Games)