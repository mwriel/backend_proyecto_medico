import express from "express"
import GameService from '../services/game.service'
import { Game } from "../types/game.type"
import passport from 'passport'
import { UserRequestType } from "../types/user.type"
const router= express.Router()
const service=new GameService()

router.post('/', 
passport.authenticate('jwt',{session: false}),
async (req: UserRequestType,res) => {
    const monster=req.query.monster as string
    const {user}=req
    console.log('usuario sacado del request')
        console.log(user)
        console.log('------------------------')
    const game: Game =req.body;
    const newGame =await service.create(game,monster)

    res.status(201).json(newGame)
})//post /games/?monster=monsterName

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
router.get('/:id', 
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
router.get('/', 
passport.authenticate('jwt',{session: false}),
async (req,res,next)=>{
    console.log('name finding')
    try{
        const game= await service.findByName(req.query.name as string)
        res.status(200).json(game)
    }catch(error){
        next(error)

    }
})//get qyery /games/?name= 'name'

export default router