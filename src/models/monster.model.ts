import { Schema, model } from "mongoose"
import { Monster, MonsterModel } from "../types/monster.type"

export const MONSTER_REFERENCE = 'Monster'
const Monsters = new Schema< Monster, MonsterModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    weakTo: [{
        type: String,
        required: true,
        trim: true

    }],
    resistantTo: [{
        type: String,
        required: false,
        trim: true
    }],
    size: {
        type: Number,
        required: true,
        trim: true

    },
    body: {
        type: String,
        required: true,
        trim: true
    }
    

})

export default model(MONSTER_REFERENCE, Monsters)