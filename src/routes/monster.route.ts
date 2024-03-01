import express from "express"
import MonsterService from '../services/monster.service'
import { Monster } from '../types/monster.type'

const router= express.Router()
const service=new MonsterService()

router.post('/', async (req,res) => {

    const monster: Monster =req.body;
    const newMonster =await service.create(monster)

    res.status(201).json(newMonster)
})//post /monster

router.get('/', async (req,res,next) => {
    try{
        const monsters = await service.findAll()
        console.log(monsters)
        res.status(200).json(monsters)
    } catch(error){
        next(error)
    }//try catch
})//get /monster

export default router