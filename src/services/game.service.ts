import Games from "../models/game.model"
import { Game, GameModel } from "../types/game.type"
import Boom from "@hapi/boom"

class GameService{
    async create(game: Game){
        const newGame=await Games.create(game).catch((error) => {
            console.log('couldn\'n create game',error)
        })
        return newGame
    }
    async findAll(){
        
        const games = await Games.find().catch((error) => {
            console.log('error while conecting to mongo',error)
        })
        if(!games[0]){
            throw Boom.notFound('there are no monsters ')
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
}


export default GameService
