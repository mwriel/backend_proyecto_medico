import Monsters from "../models/monster.model"
import { Monster, MonsterModel } from "../types/monster.type"
import Boom from "@hapi/boom"

class MonsterService{
    async create(monster: Monster){
        const newMonster=await Monsters.create(monster).catch((error) => {
            console.log('couldn\'n create monster',error)
        })
        return newMonster
    }
    async findAll(){
        
        const monsters = await Monsters.find().catch((error) => {
            console.log('error while conecting to mongo',error)
        })
        if(!monsters[0]){
            throw Boom.notFound('there are no monsters ')
        }
        return monsters
    }
}

export default MonsterService
