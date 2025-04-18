import Games from "../models/game.model"
import { Game, GameModel } from "../types/game.type"
import Boom from "@hapi/boom"
import MonsterService from "./monster.service"
import { Monster } from "../types/monster.type"
import { MONSTER_REFERENCE } from "../models/monster.model"

const monsterService=new MonsterService()
class GameService{
    async create(game: Game/*,monsterName: string*/){
        //const monster= await monsterService.findByName(monsterName)
        //const {_id}=monster
        const newGame=await Games.create(/*{...game,monster: _id}*/game).catch((error) => {
            console.log('couldn\'n create game',error)
        })

        const existingGame=await this.findById((newGame as any)._id)
        return existingGame//.populate(MONSTER_REFERENCE)
    }
    
    async findAll(){
        
        const games = await Games.find().populate({path: 'monster', strictPopulate:false}).catch((error) => {
            console.log('error while conecting to mongo',error)
        })
        if(!games[0]){
            throw Boom.notFound('there are no games ')
        }
        return games
    }
    async findById(id:string){
        const game = await Games.findById(id).catch((error) => {
            console.log('error en coneccion a mongo')
        })
        if(!game){
            throw Boom.notFound('juego no encontrado')
        }
        return game
    }
    async findByName(name:string){
        
        const game = await Games.findOne({name: name}).catch((error) => {
            console.log('error en coneccion a mongo')
        })
        if(!game){
            throw Boom.notFound('juego no encontrado')
        }
        return game
    }
    async addMonsterToGame(gameName: string, monsterName: string) {
        // Buscar el juego por nombre
        const game = await this.findByName(gameName);
        if (!game) {
            throw Boom.notFound('Juego no encontrado');
        }

        // Buscar el monstruo por nombre
        const monster = await monsterService.findByName(monsterName);
        if (!monster) {
            throw Boom.notFound('Monstruo no encontrado');
        }

        // Verificar si el monstruo ya está en el arreglo
        if (game.monster.includes(monster)) {
            throw Boom.conflict('El monstruo ya está en el juego');
        }

        // Agregar el ID del monstruo al arreglo de monstruos del juego
        game.monster.push(monster);

        // Guardar los cambios en la base de datos
        await game.save();

        return game;
    }

    async removeMonsterFromGame(gameName: string, monsterName: string) {
        const game = await this.findByName(gameName);
        if (!game) {
            throw Boom.notFound('Game not found');
        }

        const monster = await monsterService.findByName(monsterName);
        if (!monster) {
            throw Boom.notFound('Monster not found');
        }

        game.monster = game.monster.filter(monsterId => monsterId.toString() !== monster._id.toString());
        await game.save();

        return game;
    }

    async deleteGame(gameId: string) {
        const game = await this.findById(gameId);
        if (!game) {
            throw Boom.notFound('Game not found');
        }

        await Games.findByIdAndDelete(gameId);
    }
}


export default GameService
