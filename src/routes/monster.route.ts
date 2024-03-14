import express from "express"
import MonsterService from '../services/monster.service'
import { Monster } from '../types/monster.type'
import passport from 'passport'
import { UserRequestType } from "../types/user.type"
const router= express.Router()
const service=new MonsterService()

router.post('/', 
passport.authenticate('jwt',{session: false}),
async (req,res) => {

    const monster: Monster =req.body;
    const newMonster =await service.create(monster)

    res.status(201).json(newMonster)
})//post /monster

router.get('/', 
passport.authenticate('jwt',{session: false}),
async (req: UserRequestType,res,next) => {
    try{
        const {user} =req
        console.log('usuario sacado del request')
        console.log(user)
        console.log('------------------------')
        const monsters = await service.findAll()
        console.log(monsters)
        res.status(200).json(monsters)
    } catch(error){
        next(error)
    }//try catch
})//get /monster
router.get('/id/:id', 
passport.authenticate('jwt',{session: false}),
async (req,res,next)=>{
    console.log('id finding')
    try{
        const monster= await service.findById(req.params.id)
        res.status(200).json(monster)
    }catch(error){
        next(error)

    }
})
router.get('/name/', 
passport.authenticate('jwt',{session: false}),
async (req,res,next)=>{
    console.log('name finding')
    try{
        console.log(req.query.name as string)
        const monster= await service.findByName(req.query.name as string)
        const {_id}=monster
        console.log(_id)
        res.status(200).json(monster)
    }catch(error){
        next(error)

    }
})//get qyery /monsters/?name= 'name'

export default router