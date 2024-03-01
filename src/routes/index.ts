import express from "express"
import MonsterRouter from './monster.route'

const routerApi = (app)=>{
    const router= express.Router()
    app.use('/api/v1',router)
    router.use('/monsters',MonsterRouter)
}
export default routerApi