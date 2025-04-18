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
    async findById(id:string){
        const monster = await Monsters.findById(id).catch((error) => {
            console.log('error en coneccion a mongo')
        })
        if(!monster){
            throw Boom.notFound('monstruo no encontrado')
        }
        return monster
    }
    async findByName(name:string){
        const monster = await Monsters.findOne({name: name}).catch((error) => {
            console.log('error en coneccion a mongo')
        })
        if(!monster){
            throw Boom.notFound('monstruo no encontrado')
        }
        return monster
    }
    async deleteMonster(monsterId: string) {
        const monster = await this.findById(monsterId);
        if (!monster) {
            throw Boom.notFound('Monster not found');
        }

        await Monsters.findByIdAndDelete(monsterId);
    }
    
    async updateMonster(monsterId: string, updatedMonster: Monster) {
        const existingMonster = await this.findById(monsterId);
        if (!existingMonster) {
            throw Boom.notFound('Monstruo no encontrado');
        }

        const updated = await Monsters.findByIdAndUpdate(monsterId, updatedMonster, { new: true });
        if (!updated) {
            throw Boom.badRequest('No se pudo actualizar el monstruo');
        }
        return updated;
    }
}


export default MonsterService
