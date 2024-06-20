import express from "express"
import GameService from '../services/game.service'
import { Game,GameInput } from "../types/game.type"
import passport from 'passport'
import { UserRequestType } from "../types/user.type"
const router= express.Router()
const service=new GameService()

router.post('/', 
passport.authenticate('jwt',{session: false}),
async (req: UserRequestType,res) => {
    //const monster=req.query.monster as string
    //const monster=req.query.monster as string
    const {user}=req
    console.log('usuario sacado del request')
        console.log(user)
        console.log('------------------------')
    const game: Game =req.body;
    const newGame =await service.create(game)

    res.status(201).json(newGame)
})//post /games/?monster=monsterName

router.put('/addMonster/', 
    passport.authenticate('jwt',{session: false}),
    async (req: UserRequestType,res) => {
        //const monster=req.query.monster as string
        const {user}=req
        console.log('usuario sacado del request')
            console.log(user)
            console.log('------------------------')
        const input: GameInput =req.body;
        const modedGame =await service.addMonsterToGame(input.game as string,input.monster as string)
    
        res.status(201).json(modedGame)
    })//update

    router.put('/removeMonster', 
        passport.authenticate('jwt', { session: false }),
        async (req: UserRequestType, res) => {
            const input: GameInput = req.body;
            const modedGame = await service.removeMonsterFromGame(input.game as string, input.monster as string);
            res.status(201).json(modedGame);
        });



router.get('/', 
passport.authenticate('jwt',{session: false}),
async (req: UserRequestType,res,next) => {
    try{
        const {user: sub} =req
        console.log('usuario sacado del request')
        console.log(sub)
        console.log('------------------------')
        const games = await service.findAll()
        console.log(games)
        res.status(200).json(games)
    } catch(error){
        next(error)
    }//try catch
})//get /games
router.get('/id/:id', 
passport.authenticate('jwt',{session: false}),
async (req,res,next)=>{
    console.log('id finding')
    try{
        const game= await service.findById(req.params.id)
        res.status(200).json(game)
    }catch(error){
        next(error)

    }
})
router.get('/name/:game', 
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        console.log('name finding');
        const gameName: string = req.params.game as string;
        console.log(gameName)
        try {
            const game = await service.findByName(gameName);
            res.status(200).json(game);
        } catch (error) {
            next(error);
        }
    })
    router.delete('/:id', 
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            try {
                await service.deleteGame(req.params.id);
                res.status(204).end();
            } catch (error) {
                next(error);
            }
        });


export default router