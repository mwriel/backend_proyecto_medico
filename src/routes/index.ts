import express from "express"
import MonsterRouter from './monster.route'
import UserRouter from './user.route'
const routerApi = (app)=>{
    const router= express.Router()
    app.use('/api/v1',router)
    router.use('/monsters',MonsterRouter)
    router.use('/users',UserRouter)
}
export default routerApi