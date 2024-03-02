import { Schema, model } from "mongoose"
import { Monster, MonsterModel } from "../types/monster.type"

const Monsters = new Schema< Monster, MonsterModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    mostWeak: {
        type: String,
        required: true,
        trim: true

    },
    lessWeak: {
        type: String,
        required: false,
        trim: true
    },
    size: {
        type: Number,
        required: true,
        trim: true

    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    firtsGame:{
        type: String,
        required: false,
        trim: true
    }

})

export default model('Monster', Monsters)