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
router.get('/:id', async (req,res,next)=>{
    console.log('id finding')
    try{
        const monster= await service.findById(req.params.id)
        res.status(200).json(monster)
    }catch(error){
        next(error)

    }
})
router.get('/', async (req,res,next)=>{
    console.log('name finding')
    try{
        const monster= await service.findByName(req.query.name as string)
        res.status(200).json(monster)
    }catch(error){
        next(error)

    }
})

export default router